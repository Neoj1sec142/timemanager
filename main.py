import os
import psutil
from tkinter import *
import tkinter.ttk as ttk
from tkinter import messagebox as mb


root = Tk()
root.geometry("325x200")
root.configure(background='red')
root.title("Desktop Helper")

elapsed_time = 0
stopwatch_timer = None

def start_stopwatch():
    global elapsed_time, stopwatch_timer
    if elapsed_time == 0:
        elapsed_time = 1
    elapsed_time += 1
    stopwatch_label.config(text=format_time(elapsed_time))
    stopwatch_timer = stopwatch_label.after(10, start_stopwatch)

def pause_stopwatch():
    stopwatch_label.after_cancel(stopwatch_timer)

def reset_stopwatch():
    global elapsed_time, stopwatch_timer
    elapsed_time = 0
    stopwatch_label.after_cancel(stopwatch_timer)
    stopwatch_label.config(text="00:00.00")

def format_time(time):
    minutes = int(time / 6000)
    seconds = int((time - (minutes * 6000)) / 100)
    centiseconds = int(time - (minutes * 6000) - (seconds * 100))
    return f"{minutes:02}:{seconds:02}.{centiseconds:02}"

def get_cpu_usage():
    cpu_percent = psutil.cpu_percent()
    return cpu_percent

def update_loading_bar(loading_bar):
    cpu_percent = get_cpu_usage()
    loading_bar['value'] = cpu_percent
    loading_bar.update()

stopwatch_label = Label(root, text="00:00.00", font=("Arial", 20), borderwidth=2, relief="solid", padx=5, pady=5)
stopwatch_label.place(x=120, y=50)

start_button = Button(root, text="Start", command=start_stopwatch)
start_button.place(x=30, y=110)

pause_button = Button(root, text="Pause", command=pause_stopwatch)
pause_button.place(x=110, y=110)

reset_button = Button(root, text="Reset", command=reset_stopwatch)
reset_button.place(x=190, y=110)

loading_bar = ttk.Progressbar(root, orient="horizontal", length=200, mode="determinate")
loading_bar.pack(pady=10)
root.after(1000, update_loading_bar, loading_bar)
if __name__ == '__main__':
    root.mainloop()
