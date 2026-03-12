from playwright.sync_api import sync_playwright
import sys

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # The port might change, but with_server.py usually uses the one provided.
        # Nuxt default is 3000.
        url = "http://localhost:3000/create"
        print(f"Connecting to {url}...")
        
        try:
            page.goto(url, wait_until="networkidle", timeout=60000)
        except Exception as e:
            print(f"Failed to load page: {e}")
            browser.close()
            sys.exit(1)

        input_selector = "#tags"
        pill_selector = ".tag-pill"
        
        print("\n--- Testing Tag Functionality ---")
        
        # 1. Add a tag
        page.fill(input_selector, "sweet,")
        count = page.locator(pill_selector).count()
        print(f"Added 'sweet,': {count} tag(s) found. {'✅' if count == 1 else '❌'}")

        # 2. Test Duplicate
        page.fill(input_selector, "sweet,")
        count = page.locator(pill_selector).count()
        print(f"Added 'sweet,' again (duplicate): {count} tag(s) found. {'✅' if count == 1 else '❌'}")

        # 3. Test Max 5 Tags
        page.fill(input_selector, "savory, spicy, crunchy, salty, extra,")
        # Current tags: sweet, savory, spicy, crunchy, salty (5)
        # 'extra' should be ignored
        count = page.locator(pill_selector).count()
        print(f"Added 5 more tags: {count} tag(s) found. {'✅' if count == 5 else '❌'}")
        
        is_disabled = page.locator(input_selector).is_disabled()
        print(f"Input field disabled after 5 tags: {'✅' if is_disabled else '❌'}")

        # 4. Check Colors
        print("\n--- Testing Pill Visuals ---")
        first_pill = page.locator(pill_selector).first
        
        bg_color = first_pill.evaluate("el => window.getComputedStyle(el).backgroundColor")
        border_color = first_pill.evaluate("el => window.getComputedStyle(el).borderColor")
        
        text_element = first_pill.locator(".tag-text")
        text_color = text_element.evaluate("el => window.getComputedStyle(el).color")
        
        print(f"Pill Background: {bg_color} (Expected white: rgb(255, 255, 255)) {'✅' if bg_color == 'rgb(255, 255, 255)' else '❌'}")
        print(f"Pill Text Color: {text_color} (Expected black: rgb(0, 0, 0)) {'✅' if text_color == 'rgb(0, 0, 0)' else '❌'}")
        print(f"Pill Border: {border_color}")

        browser.close()

if __name__ == "__main__":
    run_test()
