import { supabase } from "@/lib/supabase"

export const sendMessage = async (conversationId: string, senderId: string, message: string) => {
  const { error } = await supabase
    .from('messages')
    .insert([{ conversation_id: conversationId, sender_id: senderId, message }]);

  if (error) {

    console.error('Error sending message:', error.message);
    return {
      success: false,
      msg: "Something went wrong while sending message"
    }

  }

  return {
    success: true
  }
};

export const fetchMessages = async (conversationId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: false });



  if (error) {
    console.error('Error fetching messages:', error.message);
    return {
      success: false,
      msg: "Something went wrong while fetching messages."
    }

  }
  return {
    success: true,
    data
  }
};


export const subscribeToMessages = (conversationId: string, callback: (message: any) => void) => {
  const channel = supabase
    .channel(`messages-conversation-${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
      },
      (payload) => {
        callback(payload.new); // Trigger callback with new message
      }
    )
    .subscribe();

  // Cleanup function to unsubscribe
  return () => {
    supabase.removeChannel(channel);
  };
};

export const subscribeToConversations = (
  userId: string | undefined,
  userType: string,
  callback: (conversation: any) => void
) => {
  if (!userId) {
    console.log("no user");
    return;
  };

  console.log(userType)
  const filter = userType === "farmer" ? `farmer_id=eq.${userId}` : `buyer_id=eq.${userId}`

  console.log(`subscribe to conversation-${userId}`);
  const channel = supabase
    .channel(`conversations-${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'conversations',
        filter
        // filter: `${userType === "farmer" ? 'farmer_id=eq.'+userId : 'buyer_id=eq.'+userId }`, // Correct filter syntax
      },
      (payload) => {
        console.log('New conversation payload:', payload);
        callback(payload.new);
      }
    )
    .subscribe();

  console.log('Conversation status ', channel);

  return () => {
    supabase.removeChannel(channel);
  };
};


export const selectConversation = async (farmerId: string, buyerId: string) => {
  const { data, error } = await supabase.from('conversations').select('*').eq('farmer_id', farmerId).eq('buyer_id', buyerId).single();
  if (error) {
    return {
      msg: "no conversation found"
    }
  }

  console.log("data for conversation >> ", data);
  return {
    success: true,
    data
  }

}

export const createConversations = async (
  farmerId: string | undefined,
  buyerId: string | undefined,
) => {
  if (!farmerId || !buyerId) {
    console.log("no farmer id or buyer id provided");
    return;
  };

  // check if conversations already exist
  const res = await selectConversation(farmerId, buyerId);
  if (res.success) {
    console.log("data ", res.data);
    return {
      data: res.data,
      msg: "conversations already exist",
      success: true
    };
  } else {
    const { error, data } = await supabase.from('conversations').insert({
      farmer_id: farmerId,
      buyer_id: buyerId
    }).select().single()

    if (error) {
      return {
        msg: 'Error while creating a conversation',
        success: false
      }
    }
    console.log('conversation created ', data);
    return {
      data,
      success: true
    }
  }


};
