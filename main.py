from kivy.app import App
from kivy.uix.button import Button
from kivy.uix.boxlayout import BoxLayout
from kivy.properties import  ObjectProperty
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.properties import StringProperty
import requests
import json
import PersonnalInformation as info
from kivy_garden.zbarcam import ZBarCam

IMAGE_URL_1 = 'https://8rhw2szkenna.usemoralis.com/Hammer.PNG'
#IMAGE_URL_1 = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.apple.com%2Fca%2Ffr%2F&psig=AOvVaw3yimNM5meSKXKF5ZfYmcFN&ust=1646937224114000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMCjhbTVufYCFQAAAAAdAAAAABAD'
IMAGE_URL_2 = 'https://8rhw2szkenna.usemoralis.com/TestWork.png'

class SettingsScreen(Screen):

    def RenderDriverLicense(self, instance):
        self.img.source = info.personnalinformation.Image
        self.img.reload()
        self.label1.text = info.personnalinformation.Description
        self.label2.text = info.personnalinformation.PrettyPrint()


    def func_xyz(self, instance):
        print(f"func_xyz: Called from Button with text={instance.text}")
        self.img.source = IMAGE_URL_2
        self.img.reload()


# Declare both screens
class MenuScreen(Screen):
    pass

class QRScreen(Screen):

    def RenderQRCode(self, instance):
        self.img.source = 'qrcode001.png'

# Create the screen manager
class ScreenManagement(ScreenManager):
    image_source = StringProperty()
    r = requests.get('http://127.0.0.1:5501/0000000000000000000000000000000000000000000000000000000000000000.json')
    dict = (r.json())
    info.personnalinformation.setInformation(dict)
    info.personnalinformation.CreateQRCode()
    pass

#read QR
class ReadQRScreen(Screen):
    def test(self,instance):
        print(' '.join([str(symbol.data) for symbol in self.cam.symbols]))

class TestApp(App):
    def build(self):
        return ScreenManagement()


if __name__ == '__main__':
    TestApp().run()