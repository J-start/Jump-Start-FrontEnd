from selenium import webdriver
from selenium.webdriver.common.by import By
import time

from test.classes.buyAsset import BuyAsset_test
from test.classes.checkBuyAsset import CheckBuyAsset
from test.classes.checkSellAsset import CheckSellAsset
from test.classes.common import Common
from test.classes.sellAsset import SellAsset



class TestOperation:
    listTests = []    
    def testBuyAsset(self):
        
        driver = webdriver.Chrome() 
        driver.get("C:/Users/User/Documents/jump-start-front/index.html")

        commomOperations = Common(driver)
        buyAssetObj = BuyAsset_test(driver)
        
        time.sleep(2) 
        commomOperations.clickButtonAlertIntialPage()
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
        driver.quit()

    def testSellAsset(self):
        
        driver = webdriver.Chrome() 
        driver.get("C:/Users/User/Documents/jump-start-front/index.html")
        
        sellAsset = SellAsset(driver)
        
        commomOperations = Common(driver)

        time.sleep(2) 
        commomOperations.clickButtonAlertIntialPage()
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
        driver.quit()

    def obtainResultTests(self):
        return self.listTests


