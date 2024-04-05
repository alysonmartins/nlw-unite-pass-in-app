import { Input } from "@/components/input";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";

import React, { useState } from "react";
import { View, Image, StatusBar, Alert, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Link, Redirect, router } from "expo-router";
import { api } from "@/server/api";
import { useBadgeStore } from '@/store/badge-store'


export default function Home() {

  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const badgeStore = useBadgeStore()

  async function handleAccessCredential() {
    try {
      if (!code.trim()) {
        return Alert.alert("Erro", 'Informe o código do ingresso!')
      }
      setIsLoading(true)

      const { data } = await api.get(`/attendees/${code}/badge`)

      badgeStore.save(data.badge)

    } catch (error) {
      console.log(error)
      setIsLoading(false)
      return Alert.alert("Erro", 'Faiou!')
    }
  }

  if (badgeStore.data?.checkInURL) {
    return <Redirect href='/ticket' />
  }




  return (
    <View className="flex-1 bg-green-500 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />

      <Image
        source={require("@/assets/logo.png")}
        className='h-16'
        resizeMode="contain"
      />

      <View className="w-full mt-12 gap-3">

        <Input>
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field placeholder="Código do ingresso"
            onChangeText={setCode}
          />
        </Input>

        <Button
          title="Acessar credencial"
          onPress={handleAccessCredential}
          isLoading={isLoading}
        />

        <Link href="/register" className="text-gray-200 text-base font-bold mt-8 text-center">
          Ainda não possui ingresso?
        </Link>


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
      </View>
    </View>
  )
}