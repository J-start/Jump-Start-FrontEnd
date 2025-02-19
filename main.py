
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

from test.classes.buyAsset import BuyAsset_test

driver = webdriver.Chrome() 

driver.get("C:/Users/User/Documents/jump-start-front/index.html")

time.sleep(2)

buyAssetObj = BuyAsset_test(driver)
time.sleep(1) 
buyAssetObj.clickButtonAlertIntialPage()
time.sleep(1) 
buyAssetObj.loginUserDefault()
time.sleep(1) 
buyAssetObj.clickButtonCoins()
time.sleep(1) 
buyAssetObj.clickButtonSeeMoreAboutCoin()
time.sleep(1) 
buyAssetObj.clickButtonBuyCoin()
time.sleep(1) 
buyAssetObj.insertQuantityToBuyCoin()
time.sleep(1) 
buyAssetObj.clickButtonAdvanceBuyCoin()
time.sleep(1) 
buyAssetObj.clickButtonConfirmationBuyCoin()

time.sleep(10)