import React, { useState } from "react";
import { View, Image, StatusBar, Alert, Text } from "react-native";
import { Link, router } from "expo-router";
import axios from "axios";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"

import { useBadgeStore } from "@/store/badge-store";

import { api } from "@/server/api";
import { Input } from "@/components/input";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";

const EVENT_ID = '9e9bd979-9d10-4915-b339-3786b1634f33'

export default function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const badgeStore = useBadgeStore()


  async function handleRegister() {
    try {
      if (!name.trim() || !email.trim()) {
        return Alert.alert("Erro", "Preencha todos os campos!")
      }

      setIsLoading(true)

      const registerResponse = await api.post(`/events/${EVENT_ID}/attendees`, {
        name,
        email
      })


      if (registerResponse.data.attendeeId) {
        const badgeResponse = await api.get(`/attendees/${registerResponse.data.attendeeId}/badge`)

        badgeStore.save(badgeResponse.data.badge)

        Alert.alert('Erro', 'Inscrição realizada com sucesso!', [
          { text: 'OK', onPress: () => router.push('/ticket') }
        ])
      }


    } catch (error) {
      // console.log(error)

      setIsLoading(false)
      if (axios.isAxiosError(error)) {
        if (String(error.response?.data.message).includes('already registered')) {
          return Alert.alert('Inscrição', 'Este e-mail já está registrado!')
        }
      }
      Alert.alert("Erro", 'Não foi possivel fazer a inscrição')

    }
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
          <FontAwesome6
            name="user-circle"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field placeholder="Nome Completo" onChangeText={setName} />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field placeholder="E-mail" keyboardType="email-address" onChangeText={setEmail} />
        </Input>

        <Button
          title="Realizar Inscrição"
          onPress={handleRegister}
          isLoading={isLoading}
        // onPress={() => console.warn('Clicou')}
        />
        <Link href="/" className="text-gray-200 text-base font-bold mt-8 text-center">
          Já possui ingresso?
        </Link>
      </View>

      <View className="mt-10 p-8 p w-full gap-5 bg-green-900 rounded-lg">
        <Text className="text-white font-bold text-center text-2xl">
          Menu DEBUG
        </Text>

        <Button
          title="GO to Home [debug]"
          // onPress={goticket}
          // isLoading
          onPress={() => router.push('/')}
        />

        <Button
          title="GO to Register [debug]"
          // onPress={goticket}
          // isLoading
          onPress={() => router.push('/register')}
        />

        <Button
          title="GO to Ticket [debug]"
          // onPress={goticket}
          // isLoading
          onPress={() => router.push('/ticket')}
        />


      </View>
    </View>
  )
}