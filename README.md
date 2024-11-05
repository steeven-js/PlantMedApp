# PlantMedApp

[PlantMed GitHub](https://github.com/steeven-js/PlantMedApp)

## Instructions de Configuration

### Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Node.js (v14.x ou supérieur)
- npm (v6.x ou supérieur) ou Yarn (v1.22.x ou supérieur)
- React Native CLI (v0.64.x ou supérieur)

### Scripts Disponibles

Dans le répertoire du projet, vous pouvez exécuter les commandes suivantes :

- **Lancer l'émulateur Android**

  ```shell
  emulator -avd Pixel_8_PRO_API -dns-server 8.8.8.8,8.8.4.4
  ```

- **Exécuter l'application sur Android**

  ```shell
  npx react-native run-android
  ```

- **Installer les dépendances iOS et exécuter l'application sur un simulateur**

  ```shell
  cd ios/
  pod install --repo-update
  cd ..
  npx react-native run-ios --simulator="iPhone 16"
  ```

- **Installer les dépendances iOS et exécuter l'application sur un device**

  ```shell
  cd ios/
  pod install --repo-update
  cd ..
  npx react-native run-ios --device="iphone11"
  
- **Reset bundle**

  ```shell
  rm Gemfile.lock                                                              
  bundle install
  brew install ruby                                                                     
  brew install cocoapods  
  ```

- **Reset pod**

  ```shell
  cd ios/                                                                               
  rm -rf Pods Podfile.lock   
  pod install
  cd .. 
  ```

- **Xcode**

  ```shell
  xed -b ios 
  ```

- **Générer une clé de signature pour la publication sur Google Play**

  ```shell
  keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
  ```

### Vérification du contenu de la clé

Pour vérifier le contenu de la clé dans votre fichier keystore, suivez ces étapes :

#### Option 1: Utilisation du chemin absolu

Utilisez le chemin absolu pour accéder directement au fichier keystore :

```shell
keytool -list -v -keystore /Users/steevenjacques/www/PlantMedApp_v2/PlantMedApp/android/app/android-plantmed.keystore -alias my-key-alias
```

#### Option 2: Naviguer vers le répertoire et utiliser le chemin relatif

1. Naviguez vers le répertoire contenant le fichier keystore :

   ```shell
   cd /Users/steevenjacques/www/PlantMedApp_v2/PlantMedApp/android/app/
   ```

2. Vérifiez que le fichier `my-upload-key.keystore` existe :

   ```shell
   ls
   ```

3. Utilisez la commande `keytool` avec le chemin relatif :

   ```shell
   keytool -list -v -keystore android-plantmed.keystore -alias my-key-alias
   ```

Ces commandes vous permettront de vérifier le contenu de votre fichier keystore et d'afficher les détails de la clé spécifiée par l'alias `my-key-alias`.

- **Construire une version de production pour Android**

  ```shell
  npx react-native build-android --mode=release
  ```

- **Installer ESLint, Prettier et la configuration ESLint-Prettier**

  ```shell
  yarn add --dev eslint prettier eslint-config-prettier
  npx eslint --init
  ```

### Installation et Exécution

Pour une installation rapide et une exécution complète, utilisez la commande suivante :

```shell
npm install && npx react-native eject && npx pod-install && npx react-native-asset && npx react-native run-ios --simulator='iPhone 15'
```