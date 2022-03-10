import qrcode

class PersonnalInformation():
    Image = ""
    Description = ""
    Name = ""
    DriverLicenseNumber = ""
    DateOfBirth = ""
    Address = ""
    ZipCode = ""
    Classe = ""
    Sexe = ""
    Eye = ""
    Cond = ""
    Mention = ""
    Height = ""
    ReferenceNumber = ""
    ValidFrom = ""
    Expire = ""

    def setInformation(self, dict):

        self.Image = dict['Image']
        self.Description = dict['Description']
        self.Name = dict['Name']
        self.DriverLicenseNumber = dict['DriverLicenseNumber']
        self.DateOfBirth = dict['DateOfBirth']
        self.Address = dict['Address']
        self.ZipCode = dict['ZipCode']
        self.Classe = dict['Classe']
        self.Sexe = dict['Sexe']
        self.Eye = dict['Eye']
        self.Cond = dict['Cond']
        self.Mention = dict['Mention']
        self.Height = dict['Height']
        self.ReferenceNumber = dict['ReferenceNumber']
        self.ValidFrom = dict['ValidFrom']
        self.Expire = dict['Expire']

    def CreateQRCode(self):
        # Link for website
        input_data = self.Image
        # Creating an instance of qrcode
        qr = qrcode.QRCode(
            version=1,
            box_size=10,
            border=5)
        qr.add_data(input_data)
        qr.make(fit=True)
        img = qr.make_image(fill='black', back_color='white')
        img.save('qrcode002.png')

    def PrettyPrint(self):
        str = "Name: " + self.Name + "\nDriver's License Number: " + self.DriverLicenseNumber \
              + "\nDate Of Birth: " + self.DateOfBirth + "\nAddress: " + self.Address + " Zipcode" + self.ZipCode \
              + "\nClasse: " + self.Classe + " sexe: " + self.Sexe + " eye color: " + self.Eye

        return str

personnalinformation = PersonnalInformation()


