from flask import Flask, request, jsonify, send_file
from qr_barcode_generator import generate_qr_code, generate_barcode
import os

# Create the Flask app
app = Flask(__name__)


# ============================================
# ROUTE 1: Generate QR + Barcode
# This is called by Jagyasini's backend
# when a new asset is registered
# ============================================
@app.route('/generate', methods=['POST'])
def generate():
    # Get the asset data sent in the request
    asset_data = request.json

    # Check if asset_id is present
    if not asset_data or "asset_id" not in asset_data:
        return jsonify({"error": "asset_id is required"}), 400

    # Generate both images
    qr_path = generate_qr_code(asset_data)
    bar_path = generate_barcode(asset_data["asset_id"])

    # Send back a success response
    return jsonify({
        "message": "Generated successfully!",
        "asset_id": asset_data["asset_id"],
        "qr_code_url": f"/download/QR_{asset_data['asset_id']}.png",
        "barcode_url": f"/download/BAR_{asset_data['asset_id']}.png"
    }), 200


# ============================================
# ROUTE 2: Download/View an image
# This is used by Kruti's frontend to
# display the QR or Barcode on screen
# ============================================
@app.route('/download/<filename>', methods=['GET'])
def download(filename):
    filepath = os.path.join("generated_codes", filename)

    # Check if file exists
    if not os.path.exists(filepath):
        return jsonify({"error": "File not found"}), 404

    return send_file(filepath, mimetype='image/png')


# ============================================
# Start the server
# ============================================
if __name__ == '__main__':
    print("🚀 QR Barcode Server is running on http://localhost:5001")
    app.run(debug=True, port=5001)