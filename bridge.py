import tkinter as tk
from tkinter import messagebox
import requests

# Function to send POST request

number_plate = ["AA489AA", "kja2132"]


def send_get_plate_in(number_plate):
    url = ('http://localhost:8000/api/parking/arrived/' + number_plate)
    try:
        response = requests.get(url)
        messagebox.showinfo("Response", response.text)
    except Exception as e:
        messagebox.showerror("Error", e)


def send_get_plate_out(number_plate):
    url = ('http://localhost:8000/api/parking/departed/' + number_plate)
    try:
        response = requests.get(url)
        messagebox.showinfo("Response", response.text)
    except Exception as e:
        messagebox.showerror("Error", e)


# Main window
root = tk.Tk()
root.title("POST Request Sender")

# Define the array of numbers
numbers = [1, 2, 3, 4]  # Replace with actual numbers from your MongoDB

# Create buttons
button1 = tk.Button(root, text="card in",
                    command=lambda: print(numbers[0]))
button2 = tk.Button(root, text="card out",
                    command=lambda: print(numbers[1]))
button3 = tk.Button(root, text="plate in",
                    command=lambda: send_get_plate_in(number_plate[1]))
button4 = tk.Button(root, text="plate out",
                    command=lambda: send_get_plate_out(number_plate[1]))

# Place buttons on the window
button1.pack(pady=10)
button2.pack(pady=10)
button3.pack(pady=10)
button4.pack(pady=10)

# Start the main loop
root.mainloop()
