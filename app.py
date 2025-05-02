from flask import Flask, send_from_directory, request
import os

app = Flask(__name__, static_folder='public')

# Serve static files from /public directory
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('public', path)

# Serve the React app for all other routes
@app.route('/')
def serve_index():
    return send_from_directory('public', 'index.html')

# Copy the veterans image to a location where Flask can serve it (already done outside the app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
