import {KinEnvironment, KinSdk} from '@kin-sdk/react-native';

export class KinService {
  constructor(protected readonly env: KinEnvironment) {
    console.log(`KinService Connected to ${env}`);
  }

  randomKeyPair(): Promise<{secret: string; publicKey: string}> {
    return KinSdk.generateRandomKeyPair();
  }

  // Create account on the Kin Blockchain
  createAccount(secret: string): Promise<boolean> {
    console.log('Kin::createAccount()', secret);

    return KinSdk.createNewAccount(this.env, {secret});
  }

  // Resolve the token accounts of this public key on the Blockchain
  resolveTokenAccounts(publicKey: string): Promise<
    Array<{
      address: string;
      balance: string;
    }>
  > {
    console.log('Kin::resolveTokenAccounts()', publicKey);

    return KinSdk.resolveTokenAccounts(this.env, {publicKey});
  }

  requestAirdrop(publicKey: string, amount: string): Promise<boolean> {
    console.log('Kin::requestAirdrop()', {publicKey, amount});

    return KinSdk.requestAirdrop(this.env, {amount, publicKey});
  }

  // Submit a payment to the Blockchain
  submitPayment(
    secret: string,
    destination: string,
    amount: string,
    memo: string,
    appIndex: number,
  ): Promise<any> {
    console.log('Kin::submitPayment()', {
      secret,
      destination,
      amount,
      memo,
      appIndex,
    });

    return KinSdk.sendPayment(this.env, {
      secret,
      destination,
      amount,
      memo,
      appIndex,
    });
  }
}
