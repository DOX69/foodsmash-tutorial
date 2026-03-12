from playwright.sync_api import sync_playwright
import sys

def run_test():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # Nuxt default is 3000.
        url = "http://localhost:3000/preview"
        print(f"Connecting to {url}...")
        
        try:
            page.goto(url, wait_until="networkidle", timeout=60000)
        except Exception as e:
            print(f"Failed to load page: {e}")
            browser.close()
            sys.exit(1)

        print("\n--- Testing Avatar Integration ---")
        
        # Check for Avatar components on the preview page
        avatars = page.locator(".avatar-circle")
        count = avatars.count()
        print(f"Found {count} Avatar component(s). {'✅' if count >= 3 else '❌'}")
        
        if count >= 3:
            # Check first avatar (default)
            first = avatars.nth(0)
            print(f"Avatar 1 text: '{first.text_content().strip()}'")
            is_primary = "bg-primary" in first.get_attribute("class")
            print(f"Avatar 1 has bg-primary: {'✅' if is_primary else '❌'}")
            
            # Check second avatar (secondary)
            second = avatars.nth(1)
            print(f"Avatar 2 text: '{second.text_content().strip()}'")
            is_secondary = "bg-secondary" in second.get_attribute("class")
            print(f"Avatar 2 has bg-secondary: {'✅' if is_secondary else '❌'}")
            
            # Check third avatar (base)
            third = avatars.nth(2)
            print(f"Avatar 3 text: '{third.text_content().strip()}'")
            is_base = "bg-base" in third.get_attribute("class")
            print(f"Avatar 3 has bg-base: {'✅' if is_base else '❌'}")

        browser.close()

if __name__ == "__main__":
    run_test()
