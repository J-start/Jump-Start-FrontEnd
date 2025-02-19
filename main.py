
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from colorama import Fore, Style

from test.classes.buyAsset import BuyAsset_test
from test.classes.checkBuyAsset import CheckBuyAsset

driver = webdriver.Chrome() 
listTests = []
listNameTests = ["Teste de compra","Teste de venda"]
driver.get("C:/Users/User/Documents/jump-start-front/index.html")

def BuyAsset():
    buyAssetObj = BuyAsset_test(driver)
    time.sleep(2) 
    buyAssetObj.clickButtonAlertIntialPage()
    time.sleep(2) 
    buyAssetObj.loginUserDefault()
    time.sleep(2) 
    buyAssetObj.clickButtonCoins()
    time.sleep(2) 
    buyAssetObj.clickButtonSeeMoreAboutCoin()
    time.sleep(2) 
    buyAssetObj.clickButtonBuyCoin()
    time.sleep(2) 
    buyAssetObj.insertQuantityToBuyCoin()
    time.sleep(2) 
    buyAssetObj.clickButtonAdvanceBuyCoin()
    time.sleep(2) 
    buyAssetObj.clickButtonConfirmationBuyCoin()

def checkStatusAfterBuy():
    checkAssetObj = CheckBuyAsset(driver)
    listTests.append(checkAssetObj.verifyBuyAssetResponse())

time.sleep(1) 
BuyAsset()
time.sleep(2) 

checkStatusAfterBuy()

time.sleep(3) 

print(Fore.BLUE+f"-------------- RESUMO DOS TESTES -------------- \n"+Style.RESET_ALL)

for index, test in enumerate(listTests):
    if test:
        print(Fore.GREEN+f"{listNameTests[index]} Passou"+Style.RESET_ALL)
    else:
        print(Fore.RED+f"{listNameTests[index]} Falhou"+Style.RESET_ALL)

print(Fore.BLUE+f"-------------- RESUMO DOS TESTES -------------- \n"+Style.RESET_ALL)