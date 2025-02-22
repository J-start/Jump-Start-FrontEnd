from selenium import webdriver
from selenium.webdriver.common.by import By
import time

from test.classes.buyAsset import BuyAsset_test
from test.classes.checkBuyAsset import CheckBuyAsset
from test.classes.checkSellAsset import CheckSellAsset
from test.classes.common import Common
from test.classes.sellAsset import SellAsset
from selenium.webdriver.chrome.options import Options
import platform



class TestOperation:
    listTests = []  

    def getWebDriverLinux(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")  
        chrome_options.add_argument("--no-sandbox") 
        chrome_options.add_argument("--disable-dev-shm-usage") 

        driver = webdriver.Chrome(options=chrome_options) 
        return driver
    
    def getWebDriverWindows(self):
        driver = webdriver.Chrome() 
        return driver

    def closeConnectionWebDriver(self,webDriver):
        webDriver.quit()  

    def testBuyAsset(self):
        driver = ""
        if platform.system() == "Linux":
            driver = self.getWebDriverLinux()
            driver.get("http://localhost:8000/public/index.html")
        else:
            driver = self.getWebDriverWindows()
            driver.get("C:/Users/User/Documents/jump-start-front/public/index.html")
        
        commomOperations = Common(driver)
        buyAssetObj = BuyAsset_test(driver)
        
        time.sleep(2) 
        commomOperations.navigateToLoginButton()
        time.sleep(2) 
        commomOperations.loginUserDefault() 
        time.sleep(2) 
        commomOperations.clickButtonCoins()
        time.sleep(2) 
        commomOperations.clickButtonSeeMoreAboutCoin()
        time.sleep(2) 
        buyAssetObj.clickButtonBuyCoin()
        time.sleep(2) 
        buyAssetObj.insertQuantityToBuyCoin()
        time.sleep(2) 
        buyAssetObj.clickButtonAdvanceBuyCoin()
        time.sleep(2) 
        buyAssetObj.clickButtonConfirmationBuyCoin()  
        time.sleep(2) 
        checkAssetObj = CheckBuyAsset(driver)
        time.sleep(2) 
        self.listTests.append(checkAssetObj.verifyBuyAssetResponse())  

        self.closeConnectionWebDriver(driver)

    def testSellAsset(self):
        driver = ""
        if platform.system() == "Linux":
            driver = self.getWebDriverLinux()
            driver.get("http://localhost:8000/public/index.html")
        else:
            driver = self.getWebDriverWindows()  
            driver.get("C:/Users/User/Documents/jump-start-front/public/index.html")   
        
        sellAsset = SellAsset(driver)
        
        commomOperations = Common(driver)

        time.sleep(2) 
        commomOperations.navigateToLoginButton()
        time.sleep(2) 
        commomOperations.loginUserDefault() 
        time.sleep(2) 
        commomOperations.clickButtonCoins()
        time.sleep(2) 
        commomOperations.clickButtonSeeMoreAboutCoin()
        time.sleep(2) 
        sellAsset.clickButtonSellAsset()
        time.sleep(2) 
        sellAsset.insertQuantityToSell()
        time.sleep(2) 
        sellAsset.clickButtonAdvanceToSell()
        time.sleep(2)
        sellAsset.clickButtonConfirmationSellAsset()
        time.sleep(2)
        checkAssetObj = CheckSellAsset(driver)
        time.sleep(2)
        self.listTests.append(checkAssetObj.verifySellAssetResponse()) 
        
        self.closeConnectionWebDriver(driver)

    def obtainResultTests(self):
        return self.listTests


