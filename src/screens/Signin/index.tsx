import React, { useContext, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'

import { useAuth } from '../../hooks/auth'

import { SigninSocialButton } from '../../Components/SigninSocialButton'

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SigninTitle,
  Footer,
  FooterWrapper
} from './styles'
import { ActivityIndicator, Alert, Platform } from 'react-native'

export function Signin() {
  const [isLoading, setIsLoading] = useState(false)
  const { signInWithGoogle, signInWithApple } = useAuth()

  const theme = useTheme()

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true)
      return await signInWithGoogle()
    } catch (error) {
      Alert.alert('Não foi possível conectar a conta Google')
      console.log(error)
      setIsLoading(false)
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true)
      return await signInWithApple()
    } catch (error) {
      Alert.alert('Não foi possível conectar a conta Apple')
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle suas {'\n'}
            finanças de forma {'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SigninTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SigninTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SigninSocialButton title="Entrar com Google" svg={GoogleSvg} onPress={handleSignInWithGoogle} />

          {Platform.OS === 'ios' &&
            <SigninSocialButton title="Entrar com Apple" svg={AppleSvg} onPress={handleSignInWithApple} />
          }
        </FooterWrapper>

        {isLoading &&
          <ActivityIndicator
            color={theme.colors.shape}
            style={{ marginTop: 18 }}
          />
        }
      </Footer>
    </Container>
  )
}