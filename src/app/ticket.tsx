import React, { useState } from "react";
import { StatusBar, View, Text, ScrollView, TouchableOpacity, Alert, Modal, Share } from "react-native";
import * as ImagePicker from "expo-image-picker"

import { useBadgeStore } from '@/store/badge-store'

import { colors } from "@/styles/colors";
import { Header } from "@/components/header";
import { Button } from '@/components/button';
import { FontAwesome } from "@expo/vector-icons";
import { Credential } from "@/components/credential";
import { QRCode } from "@/components/qrcode";
import { Redirect, router } from "expo-router";
import { MotiView } from "moti";




export default function Ticket() {
  const [image, setImage] = useState('')
  const [expandQRCode, setExpandQRCode] = useState(false)

  const badgeStore = useBadgeStore()

  async function handleShare() {
    try {
      if (badgeStore.data?.checkInURL) {
        await Share.share({
          message: badgeStore.data.checkInURL
        })
      }

    }
    catch (error) {
      console.log(error)
      Alert.alert('Error', 'Não foi possivel compartilhar')
    }
  }

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4]
      })

      if (result.assets) {
        setImage(result.assets[0].uri)
        badgeStore.updateAvatar(result.assets[0].uri)
      }
    }
    catch (error) {
      console.log(error)
      Alert.alert('Avatar', 'Erro ao selecionar image')
    }
  }

  if (!badgeStore.data?.checkInURL) {
    return <Redirect href='/' />
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />
      <Header title='Minha Credencial' />
      <ScrollView
        className="-mt-28 -z-10"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-8 pb-8"
      >

        <Credential
          data={badgeStore.data}
          onChangeAvatar={handleSelectImage}
          onExpandQRCode={() => setExpandQRCode(true)}
        />

        <MotiView
          from={{
            translateY: 0,
          }}
          animate={{
            translateY: 10,
          }}
          transition={{
            loop: true,
            duration: 700,
            type: 'timing',
          }}>

          <FontAwesome
            size={24}
            name="angle-double-down"
            color={colors.gray[300]}
            className="self-center my-6"
          />

        </MotiView>

        <Text className='text-white font-bold text-2xl mt-4'>
          Compartilhar credencial
        </Text>

        <Text className='text-white font-regular text-base mt-1 mb-6'>
          Mostre ao mundo que você vai particiar do {badgeStore.data.eventTitle}
        </Text>

        <Button title='Compartilhar' onPress={handleShare} />

        <TouchableOpacity
          className="mt-10"
          activeOpacity={0.8}
          onPress={() => badgeStore.remove()}
        >
          <Text
            className="text-base text-white font-bold text-center"
          >
            Remover Ingresso
          </Text>

        </TouchableOpacity>


        <View className="mt-10 p-8 p w-full gap-5 bg-green-900 rounded-lg">
          <Text className="text-white font-bold text-center text-2xl">
            Menu DEBUG
          </Text>

          <Button
            title="GO to Home [debug]"
            onPress={() => router.push('/')}
          />

          <Button
            title="GO to Register [debug]"
            onPress={() => router.push('/register')}
          />

          <Button
            title="GO to Ticket [debug]"
            onPress={() => router.push('/ticket')}
          />


        </View>

      </ScrollView>

      <Modal visible={expandQRCode} statusBarTranslucent animationType="slide">
        <View className="flex-1 bg-green-500 items-center justify-center">

          <TouchableOpacity activeOpacity={0.8} onPress={() => setExpandQRCode(false)}>
            <QRCode value={badgeStore.data.checkInURL} size={300} />
            <Text className="text-md font-body text-center mt-10 text-orange-500">Fechar QRCode</Text>
          </TouchableOpacity>
        </View>
      </Modal>




    </View>
  )
}