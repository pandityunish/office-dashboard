import qrcode
import cv2
from pyzbar.pyzbar import decode


def generate_random_qr(data):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save("random_qr.png")
    print("QR code saved as 'random_qr.png'")


def scan_qr_code(image_path):
    image = cv2.imread(image_path)
    barcodes = decode(image)

    if barcodes:
        decoded_data = barcodes[0].data.decode("utf-8")
        return decoded_data
    else:
        return None


if __name__ == "__main__":
    data_to_encode = "Org Epass Module"
    generate_random_qr(data_to_encode)

    scanned_data = scan_qr_code("random_qr.png")

    if scanned_data:
        print("Scanned data:", scanned_data)

        if "complex" in scanned_data:
            print("Validation: Data contains 'complex'. Valid!")
        else:
            print("Validation: Data does not meet the validation criteria. Invalid!")
    else:
        print("No QR code detected in the image.")
