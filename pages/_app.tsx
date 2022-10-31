import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets, Theme, lightTheme, darkTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { mode } from "@chakra-ui/theme-tools";
import colors from './Colors';
import merge from 'lodash.merge';

// const walletThemeLight = merge(lightTheme({
//   overlayBlur: 'small',
// }), {
//   colors: {
//     accentColor: colors.accent,
//     connectButtonBackground: colors.accent,
//     connectButtonBackgroundError: colors.accent,
//     connectButtonInnerBackground: "#775454",
//     connectButtonText: colors.primary,
//     modalBackground: colors.primary,
//   },
// } as Theme);

const walletTheme = merge(darkTheme({
  overlayBlur: 'small',
}), {
  colors: {
    accentColor: colors.primary,
    accentColorForeground: colors.dark_bg,
    connectButtonText: colors.dark_bg,
    connectButtonBackground: colors.primary_light,
    connectButtonBackgroundError: colors.primary,
    connectButtonInnerBackground: colors.secondary,
  },
  fonts: {
    body: "Gagkline",
  },
} as Theme);

const chakraTheme = extendTheme({
  fonts: {
    heading: `'Gagkline'`,
    body: `'Gagkline'`,
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode(colors.primary, colors.dark_bg)(props),
        color: mode(colors.accent, colors.primary)(props),
      }
    })
  }
})

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.polygonMumbai,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
  ],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        theme={ walletTheme }
        chains={chains} 
        modalSize="compact"
      >
        <ChakraProvider theme={chakraTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
