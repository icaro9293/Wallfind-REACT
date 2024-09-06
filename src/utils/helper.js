import { Alert, Linking, PermissionsAndroid, Platform } from "react-native"

export const requestWriteExternalStoragePermission = async () => {
    if (Number(Platform.Version) < 33) {
        return true
    }
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
            title: "Permissão de Armazenamento",
            message: "O App precisa de acesso ao armazenamento local para salvar o wallpaper",
        },
    )
    if (granted === PermissionsAndroid.RESULTS.DENIED) {
        Alert.alert(
            'Permissão Necessária',
            'O App precisa de acesso ao armazenamento local para salvar o wallpaper',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Pedir Permissão Novamente',
                    onPress: () => requestWriteExternalStoragePermission()
                }
            ]
        )
    }
    if (granted === PermissionsAndroid.PERMISSIONS.NEVER_ASK_AGAIN) { //caso ele aperte em 'cancelar'
        Alert.alert('Permissão Necessária', 'ative a permissão nas configurações do seu dispositivo para baixar o wallpaper',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Abrir Configuração',
                    onPress: () => Linking.openSettings()
                }
            ]
        )
    }
    if (granted === PermissionsAndroid.PERMISSIONS.GRANTED) {
        console.log('permissão para escrever no armazenamento local aceita')
        return true
    }
}