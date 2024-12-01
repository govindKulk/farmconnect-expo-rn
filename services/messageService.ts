import { supabase } from "@/lib/supabase"

export const sendMessage = async (conversationId: number, senderId: string, message: string) => {
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

export const fetchMessages = async (conversationId: number) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });



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


export const subscribeToMessages = (conversationId: number, callback: (message: any) => void) => {
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
  if (!userId) return;

  const channel = supabase
    .channel(`conversations-${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'conversations',
        filter: `${userType === "farmer" ? 'farmer_id=eq'+userId : 'buyer_id=eq.'+userId }`, // Correct filter syntax
      },
      (payload) => {
        console.log('New conversation payload:', payload);
        callback(payload.new);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};


