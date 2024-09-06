//checar permissão -> baixar o arquivo no diretório do app -> copiar para o diretório de mídia.

import { useState } from "react"
import ReactNativeBlobUtil from "react-native-blob-util"
import { requestWriteExternalStoragePermission } from "../utils/helper"
import { Alert } from "react-native"

export const useDownloadFile = () => {
    let directory = ReactNativeBlobUtil.fs.dirs
    const folderPath = directory.DownloadDir + '/wallpapers'
    const [downloading, setDownloading] = useState(false)
    const [porcentagem, setPorcentagem] = useState(0)

    const downloadFile = async (url, fileName) => {
        if (!url) {
            return
        }
        const isAllowed = await requestWriteExternalStoragePermission() //verificar como fazer a verificação.
        console.log(isAllowed)
        // if (!isAllowed) {
        //     Alert.alert('Permissão Necessária', "É necessáro conceder permissão para fazer o download do arquivo")
        //     return
        // }
        try {
            setDownloading(true)
            const res = await ReactNativeBlobUtil.config({
                path: `${folderPath}/${fileName}.png`,
                fileCache: true,
                appendExt: 'png',
                addAndroidDownloads: {
                    notification: true,
                    title: 'Download Completo!',
                    description: 'arquivo de imagem(png)',
                    mediaScannable: true // o arquivo será acessivel pela notificação
                }
            }).fetch('GET', url).progress((received, total) => { //quanto ja foi baixado e o total
                const porcentagemProgresso = Math.floor((received / total) * 100)
                setPorcentagem(porcentagemProgresso)
            }).then(async (res) => {
                let result = await ReactNativeBlobUtil.MediaCollection.copyToMediaStore({
                    name: fileName,
                    parentFolder: 'wallpapers',
                    mimeType: 'image/png'
                }, 'Download', res.path())
                Alert.alert('Wallpaper Baixado', 'o wallpaper foi baixado com sucesso', [
                    {
                        text: 'Fechar',
                        style: 'cancel'
                    }

                ], { cancelable: true })
            })
        } catch (err) {
            console.log('error: ', error)
        } finally {
            setDownloading(false)
        }
    }
    return {
        downloading,
        porcentagem,
        downloadFile
    }
}

