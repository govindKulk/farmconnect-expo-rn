import { View, Text, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { BackButton, Button, Header, ScreenWrapper, TextField } from '@/components'
import { hp, wp } from '@/helpers'
import { useRouter } from 'expo-router'

import CustomPicker from '@/components/CustomPicker'
import { theme } from '@/constants'
import Icon from '@/assets/icons'
import { fetchCategories, fetchCrops } from '@/services/produceService'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'


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
  const [selectedProduceCycle, setSelectedProduceCycle] = useState("Kharif");
  const [selectedUnit, setSelectedUnit] = useState("kg");
  const [selectedIsOrganic, setSelectedIsOrganic] = useState(true);
  const productDescription = useRef<string>('');
  const productQuantity = useRef<string>('');
  const productPrice = useRef<string>('');


  const {user} = useAuth();  

  useEffect(() => {
    async function apiCalls() {
      const categories = await fetchCategories();
      const crops = await fetchCrops();

      // console.log("Categories >> ", categories);
      console.log("crops >> ", crops);

      if (categories.data) {

        setCategoryOptions(
          categories.data?.map((cat) => ({
            value: cat.name,
            label: cat.name
          })))

        setSelectedCrop(categories.data[0].id);
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
  }, [])

  const onSubmit = async () => {

    const inputData = {
      farmer_id: user?.id,
      crop_id: selectedCrop,
      produce_cycle: selectedProduceCycle,
      expected_rate: productPrice.current,
      quantity: productQuantity.current,
      unit: selectedUnit,
      description: productDescription.current
    };

    const {
      error
    } = await supabase.from("products").insert(inputData);

    if(error){
      Alert.alert("Add Product", "Error adding product");
      console.log(error);;
      return;
    }

    Alert.alert("Add Product", "Successfully added product");
    router.push('/(tabs)');
  }

  return (
    <ScreenWrapper>
      <View
        style={styles.container}
      >

        <Header title="Add Produce" />

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
});
export default AddProduce