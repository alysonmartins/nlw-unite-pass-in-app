import { Input } from "@/components/input";
import { colors } from "@/styles/colors";
import { Button } from "@/components/button";

import React from "react";
import { View, Image, StatusBar } from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"
import { Link } from "expo-router";



export default function Register() {
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
          <Input.Field placeholder="Nome Completo" />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field placeholder="E-mail" keyboardType="email-address" />
        </Input>

        <Button
          title="Realizar Inscrição"
        // isLoading
        // onPress={() => console.warn('Clicou')}
        />
        <Link href="/" className="text-gray-200 text-base font-bold mt-8 text-center">
          Já possui ingresso?
        </Link>
      </View>
    </View>
  )
}