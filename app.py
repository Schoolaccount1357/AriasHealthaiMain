from flask import Flask, send_from_directory, request, redirect
import os
import random
import string

app = Flask(__name__, static_folder='public')

# Serve static files from /public directory
@app.route('/<path:path>')
def serve_static(path):
    # Special route for serving images
    if path.startswith('images/'):
        return send_from_directory('public', path)
    return send_from_directory('public', path)

# Serve the React app for all other routes
@app.route('/')
def serve_index():
    return send_from_directory('public', 'index.html')

# Use this route to confirm the server is working
@app.route('/health')
def health_check():
    return {'status': 'ok', 'message': 'Flask server is running'}

# API route to check if the image exists
@app.route('/api/check-image')
def check_image():
    image_path = 'public/images/veterans-group.png'
    if os.path.exists(image_path):
        image_size = os.path.getsize(image_path)
        return {
            'exists': True,
            'size': image_size,
            'path': image_path
        }
    return {'exists': False}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
