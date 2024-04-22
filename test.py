#!/usr/bin/env python3

# Import any necessary modules
import base64
from selenium import webdriver

# Add the main block
if __name__ == "__main__":
    # Initialize the WebDriver
    driver = webdriver.Chrome()

    try:
        # Open the webpage
        driver.get("https://www.google.com")

        # Capture screenshot
        screenshot_data = driver.get_screenshot_as_base64()

        # Print the base64-encoded image data to stdout
        print(screenshot_data)

    finally:
        # Close the browser to clean up resources
        driver.quit()
