import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, Text, View} from 'react-native';
import {KinEnvironment} from '@kin-sdk/react-native';
import {KinService} from './KinService';
import {KinAccount} from './interfaces/kin-account.interface';

export default function App() {
  const kinService = new KinService(KinEnvironment.Test);
  const [account, setAccount] = useState<KinAccount>();

  useEffect(() => {
    // Create a new account
    kinService
      .randomKeyPair()
      .then((acc) => {
        kinService.createAccount(acc.secret).then((result: any) => {
          console.log('Account created on Blockchain', result);
          setAccount(acc);
        });
      })
      .then((e) => {
        console.log('An error occurred', e);
      });
  }, []);

  // Resolve the account to check if they exist, and get the balance
  const onResolveAccount = () => {
    kinService
      .resolveTokenAccounts(account.publicKey)
      .then((res) => console.log('Balance retrieved from Blockchain', res));
  };

  // Request and airdrop to receive a bit of Kin
  const onRequestAirdrop = () => {
    kinService
      .requestAirdrop(account.publicKey, '10')
      .then((res) => console.log('Airdrop requested from Blockchain', res));
  };

  // Submit a payment
  const onSubmitPayment = async () => {
    const destination = 'Don8L4DTVrUrRAcVTsFoCRqei5Mokde3CV3K9Ut4nAGZ';
    const amount = '2';
    const memo = 'Test Memo';

    return kinService
      .submitPayment(account.secret, destination, amount, memo, 0)
      .then((result) => {
        console.log('Payment submitted on Blockchain', result);
      });
  };

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 8}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Secret: {account?.secret}</Text>
        <Text>PublicKey: {account?.publicKey}</Text>
      </View>

      {account && (
        <View style={{height: 150, justifyContent: 'space-evenly'}}>
          <Button onPress={onResolveAccount} title="Refresh" />
          <Button onPress={onRequestAirdrop} title="Request Airdrop" />
          <Button onPress={onSubmitPayment} title="Send Kin" />
        </View>
      )}
    </SafeAreaView>
  );
}
