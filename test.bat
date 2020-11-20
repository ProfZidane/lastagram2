GENERER UN KEY STORE : 
keytool -genkey -v -keystore my-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-alias

LISTER LES CLES DU KEY STORE : 
keytool -list -v -keystore my-release-key.jks

NOM DU FICHER ASSET : 
assetlinks.json