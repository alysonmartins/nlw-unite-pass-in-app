import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from "react-native";
import types from "tailwindcss";


type Props = TouchableOpacityProps & {
  title: string,
  isLoading?: boolean
}


export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isLoading}
      className="w-full bg-orange-500 h-14 items-center justify-center rounded-lg"
      {...rest}
    >
      {
        isLoading ? (<ActivityIndicator className="text-green-500" />
        ) : (
          <Text
            className="text-green-500 text-base font-bold uppercase">
            {title}
          </Text>
        )
      }


    </TouchableOpacity>
  )
}