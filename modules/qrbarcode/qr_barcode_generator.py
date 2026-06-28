
import qrcode                          # for making QR codes
import barcode                         # for making barcodes
from barcode.writer import ImageWriter # helps save barcode as image
from PIL import Image                  # helps handle image files
import json                            # helps convert data to text format
import os                              # helps work with folders and files

# --- SETUP OUTPUT FOLDER ---
# This creates a folder called "generated_codes"
# where all your QR and barcode images will be saved
OUTPUT_DIR = "generated_codes"
os.makedirs(OUTPUT_DIR, exist_ok=True)
# exist_ok=True means: don't give error if folder already exists


# ============================================
# FUNCTION 1: Generate QR Code
# ============================================
def generate_qr_code(asset_data):
    """
    This function takes asset information
    and creates a QR Code image from it.

    asset_data is a dictionary (like a form) containing:
    - asset_id       → unique ID like "A1001"
    - asset_name     → "Dell Latitude 5440"
    - category       → "Laptop"
    - serial_number  → "DL5440X123456"
    """

    # Get the asset_id from the data
    asset_id = asset_data["asset_id"]

    # Convert the entire asset_data dictionary into a text string
    # json.dumps turns {"asset_id": "A1001"} into '{"asset_id": "A1001"}'
    qr_data = json.dumps(asset_data)

    # Create a QR code object with settings
    qr = qrcode.QRCode(
        version=1,                              # size of QR (1 = smallest)
        error_correction=qrcode.constants.ERROR_CORRECT_H,  # can recover if 30% damaged
        box_size=10,                            # size of each small square
        border=4,                               # white space around QR
    )

    # Add the asset data into the QR code
    qr.add_data(qr_data)
    qr.make(fit=True)   # auto-adjust size to fit data

    # Create the actual image
    img = qr.make_image(fill_color="black", back_color="white")

    # Decide where to save the file
    # Example: generated_codes/QR_A1001.png
    filepath = os.path.join(OUTPUT_DIR, f"QR_{asset_id}.png")

    # Save the image to that file path
    img.save(filepath)

    print(f"✅ QR Code created and saved at: {filepath}")
    return filepath   # return the path so other code can use it


# ============================================
# FUNCTION 2: Generate Barcode
# ============================================
def generate_barcode(asset_id):
    """
    This function takes an asset_id
    and creates a Barcode image from it.

    asset_id is just a string like "A1001"
    """

    # Get the Code128 barcode format
    # Code128 is the most common barcode type used in offices
    CODE128 = barcode.get_barcode_class('code128')

    # Create the barcode with the asset_id text
    # ImageWriter() means save it as an image file
    bc = CODE128(asset_id, writer=ImageWriter())

    # Decide where to save the file
    # Note: .save() automatically adds .png at the end
    # So filepath will become generated_codes/BAR_A1001.png
    filepath = os.path.join(OUTPUT_DIR, f"BAR_{asset_id}")

    # Save the barcode image
    bc.save(filepath)

    print(f"✅ Barcode created and saved at: {filepath}.png")
    return filepath + ".png"


# ============================================
# TEST BLOCK
# This runs only when you directly run this file
# It will NOT run when Flask imports this file
# ============================================
if __name__ == "__main__":

    # Create a sample/fake asset to test with
    sample_asset = {
        "asset_id": "A1001",
        "asset_name": "Dell Latitude 5440",
        "category": "Laptop",
        "serial_number": "DL5440X123456",
        "status": "Assigned"
    }

    print("🚀 Starting QR and Barcode generation test...")
    print("----------------------------------------------")

    # Test QR Code generation
    generate_qr_code(sample_asset)

    # Test Barcode generation
    generate_barcode(sample_asset["asset_id"])

    print("----------------------------------------------")
    print("🎉 Done! Check the 'generated_codes' folder.")