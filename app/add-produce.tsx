import { View, Text, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView, Alert, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BackButton, Button, Header, Loading, ScreenWrapper, TextField } from '@/components'
import { hp, wp } from '@/helpers'
import { useLocalSearchParams, useRouter } from 'expo-router'

import CustomPicker from '@/components/CustomPicker'
import { theme } from '@/constants'
import Icon from '@/assets/icons'
import { fetchCategories, fetchCrops, getSingleProduct } from '@/services/produceService'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import * as ImagePicker from 'expo-image-picker'
import { getUserImageSrc, uploadFile } from '@/services'


const cropCategories = ["Cereals",
  "Vegetables",
  "Fruits",
  "Pulses",
  "Oilseeds",
  "Spices",
  "Others"];

const unitOptions = [
  { value: "kg", label: "Kilograms (kg)" },
  { value: "q", label: "Quintals (q)" },
  { value: "MT", label: "Metric Tons (MT)" },
  { value: "g", label: "Grams (g)" },
  { value: "L", label: "Liters (L)" },
  { value: "mL", label: "Milliliters (mL)" },
  { value: "dozen", label: "Dozen" },
  { value: "crate", label: "Crates" },
  { value: "box", label: "Boxes" },
  { value: "bundle", label: "Bundles" },
  { value: "barrel", label: "Barrels" },
];

const AddProduce = () => {

  const router = useRouter();
  const emailRef = useRef<string>('');
  const passwordRef = useRef<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [categoryOptions, setCategoryOptions] = useState<any>([
    {
      value: null,
      label: null
    }
  ])
  const [cropOptions, setCropOptions] = useState<any>([
    {
      value: null,
      label: null
    }
  ])

  // states
  const [selectedCropCategory, setSelectedCropCategory] = useState();
  const [selectedCrop, setSelectedCrop] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [selectedProduceCycle, setSelectedProduceCycle] = useState("Kharif");
  const [selectedUnit, setSelectedUnit] = useState("kg");
  const [selectedIsOrganic, setSelectedIsOrganic] = useState(true);
  const [productDescriptionState, setProductDescription] = useState<any>("");
  const [productQuantityState, setproductQuantity] = useState<any>("");
  const [productPriceState, setproductPrice] = useState<any>("");
  const productDescription = useRef<string>(productDescriptionState);
  const productQuantity = useRef<string>(productQuantityState);
  const productPrice = useRef<string>(productPriceState);



  const { user } = useAuth();

  const params = useLocalSearchParams();
  useEffect(() => {
    async function apiCalls() {
      const categories = await fetchCategories();
      const crops = await fetchCrops();

      // console.log("Categories >> ", categories);
      // console.log("crops >> ", crops);

      if (categories.data) {

        setCategoryOptions(
          categories.data?.map((cat) => ({
            value: cat.name,
            label: cat.name
          })))

        if (!params.productId) {

          setSelectedCrop(categories.data[0].id);
        }
      }

      if (crops.data) {

        setCropOptions(
          crops.data?.map((crop) => ({
            value: crop.id,
            label: crop.name
          })))
      }
    }
    apiCalls();

    if (params.productId) {
      async function handleProductUpdate() {
        const res = await getSingleProduct(params.productId as string);
        if (res.data) {
          console.log("data >> ", res.data);
          const p = res.data;

          productDescription.current = p.description;
          setSelectedUnit(p.unit);
          setSelectedProduceCycle(p.produce_cycle);
          setSelectedIsOrganic(p.is_organic);
          setSelectedCropCategory(p.crop.category.name);
          productQuantity.current = p.quantity;
          productPrice.current = p.price;
          setSelectedCrop(p.crop_id)
          setSelectedImage(p.cover_image);
        } else {
          console.log("error while fetching single record >> ", res);
        }

      }
      handleProductUpdate();
    }




  }, [])


  const [image, setImage] = useState('');
  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = async () => {

    setLoading(true);

    const inputData: any = {
      farmer_id: user?.id,
      crop_id: selectedCrop,
      produce_cycle: selectedProduceCycle,
      expected_rate: productPrice.current,
      quantity: productQuantity.current,
      unit: selectedUnit,
      description: productDescription.current,
      cover_image: null
    };

    if (image.includes('///')) {
      /** Upload image */
      let imageRes = await uploadFile('products', image, true);
      if (imageRes.success) {
        inputData.cover_image = imageRes.data || '';
      } else {
        inputData.cover_image = null;
      }
    }

    if (params.productId) {
      const {
        error
      } = await supabase.from("products").update(inputData).eq('id', params.productId);

      if (error) {

        setLoading(false);
        Alert.alert("Add Product", "Error adding product");
        console.log(error);;
        return;
      }

      setLoading(false);
      Alert.alert("Update Product", "Successfully modified product");

      router.push('/(tabs)');
      return;
    }
    const {
      error
    } = await supabase.from("products").insert(inputData);

    if (error) {
      setLoading(false);
      Alert.alert("Add Product", "Error adding product");
      console.log(error);;
      return;
    }

    setLoading(false);
    Alert.alert("Add Product", "Successfully added product");
    router.push('/(tabs)');
  }

  const onDelete = async () => {
    setLoading(true);
    const {error} = await supabase.from('products').delete().eq("id", params.productId);
    if(error){
      setLoading(false);
      Alert.alert("Error while deleting bid");
      return;
    }
    setLoading(false);
    Alert.alert("Successfully deleted bid");
    router.back();
}
  return (
    <ScreenWrapper>
      <View
        style={styles.container}
      >

        <Header title={params.productId ? 'Update Product' : 'Add Product'} />

        <ScrollView >



          {/** Form */}
          <View style={styles.form}>


            {/* Crop category */}
            <CustomPicker
              options={
                categoryOptions as any
              }
              labelText="Crop Category"
              selectedValue={selectedCropCategory}
              setselectedValue={(value) => setSelectedCropCategory(value)}
              icon={<Icon name={'mail'} size={26} strokeWidth={1.6} />}



            />
            {/* Crop */}
            <CustomPicker
              options={
                cropOptions as any
              }
              labelText="Crop Name"
              selectedValue={selectedCrop}
              setselectedValue={(value) => setSelectedCrop(value)}
              icon={<Icon name={'mail'} size={26} strokeWidth={1.6} />}



            />

            <CustomPicker
              options={
                [
                  {
                    value: "Kharif",
                    label: "Kharif"
                  },
                  {
                    value: "Rabi",
                    label: "Rabi"
                  },
                  {
                    value: "Zaid",
                    label: "Zaid"
                  }
                ]
              }

              labelText="Produce Cycle"
              selectedValue={selectedProduceCycle}
              setselectedValue={(value) => setSelectedProduceCycle(value)}
              icon={<Icon name={'mail'} size={26} strokeWidth={1.6} />}



            />

            {/* expected rate */}

            {/* quantity */}

            {/* units */}

            <CustomPicker
              options={
                unitOptions
              }

              labelText="Units"
              selectedValue={selectedUnit}
              setselectedValue={(value) => setSelectedUnit(value as string)}
              icon={<Icon name={'mail'} size={26} strokeWidth={1.6} />}



            />

            {/** Quantity  */}

            <TextField
              icon={<Icon name={'lock'} size={26} strokeWidth={1.6} />}
              onChangeText={(value) => (productQuantity.current = value)}
              keyboardType="numeric"
              placeholder={'Product Quantity'}
            />
            {/** Price */}

            <TextField
              icon={<Icon name={'lock'} size={26} strokeWidth={1.6} />}
              onChangeText={(value) => (productPrice.current = value)}

              keyboardType="numeric"
              placeholder={'Product Price / per unit'}
            />


            <CustomPicker
              options={
                [
                  {
                    value: "true",
                    label: "Yes"
                  }, {
                    value: "false",
                    label: "No"
                  }
                ]
              }

              labelText="Is Organic ? "
              selectedValue={selectedIsOrganic}
              setselectedValue={(value) => setSelectedIsOrganic(value as boolean)}
              icon={<Icon name={'mail'} size={26} strokeWidth={1.6} />}



            />

            {/** Description */}

            <TextField
              icon={<Icon name={'lock'} size={26} strokeWidth={1.6} />}
              onChangeText={(value) => (productDescription.current = value)}
              multiline={true}
              placeholder={'Describe your product'}
            />

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start'
              }}
            >
              <Pressable onPress={onPickImage} style={styles.cameraIcon}>
                <Text>
                  Upload Photo
                </Text>
                <Icon name={'camera'} size={20} strokeWidth={2.5} />
              </Pressable>

              <Image
                source={params.productId ? (image?.includes('///') ? {uri : image} : getUserImageSrc(selectedImage, true)) : (image?.includes('///') ? { uri: image } : require('@/assets/images/tomato.jpg'))}

                style={{
                  flex: 1,
                  width: "100%",
                  height: hp(30),
                  borderRadius: 20,
                  marginTop: hp(2)
                }}
              />
            </View>

            {params.productId &&

              <Pressable

                onPress={onDelete}
                style={{

                  alignItems: 'center',
                  borderColor: theme.colors.rose,
                  borderCurve: 'continuous',
                  borderRadius: theme.radius.xxl,
                  borderWidth: 0.4,
                  flexDirection: 'row',
                  gap: 12,
                  height: hp(7.2),
                  justifyContent: 'center',
                  paddingHorizontal: 18,
                }}
              >
                {
                  loading ? <Loading/> : <><Text
                  style={{color: "red"}}
                  >
                    Delete This Product
                  </Text>
                  <Icon name="delete" size={20} strokeWidth={3.2} color="red" /></>
                }
              </Pressable>
            }

            {/** Button Submit */}
            <Button loading={loading} onPress={onSubmit} title={'Add'} />
          </View>


        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  forgotPassword: {
    color: theme.colors.text,
    fontWeight: theme.fonts.semibold,
    textAlign: 'right',
  },
  form: {
    gap: 25,
    marginBottom: hp(2)
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
  },
  footerText: {
    color: theme.colors.text,
    textAlign: 'center',
    fontSize: hp(1.6),
  },
  welcomeText: {
    color: theme.colors.text,
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
  },
  cameraIcon: {
    bottom: 0,
    padding: 8,
    flex: 1,

    alignItems: 'center',
    borderColor: theme.colors.text,
    borderCurve: 'continuous',
    borderRadius: theme.radius.xxl,
    borderWidth: 0.4,
    flexDirection: 'row',
    gap: 12,
    height: hp(7.2),
    justifyContent: 'center',
    paddingHorizontal: 18,




  },
});
export default AddProduce