
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from colorama import Fore, Style

from test.classes.buyAsset import BuyAsset_test
from test.classes.checkBuyAsset import CheckBuyAsset
from test.classes.common import Common
from test.classes.testOperations import TestOperation

listTests = []
listNameTests = ["Teste compra de ativo","Teste venda de ativo"]

tests = TestOperation()
tests.testBuyAsset()
tests.testSellAsset()

listTests = tests.obtainResultTests()

print(Fore.BLUE+f"-------------- RESUMO DOS TESTES -------------- \n"+Style.RESET_ALL)

for index, test in enumerate(listTests):
    
    if test:
        print(Fore.GREEN+f"{listNameTests[index]} Passou"+Style.RESET_ALL)
    else:
        print(Fore.RED+f"{listNameTests[index]} Falhou"+Style.RESET_ALL)

print(Fore.BLUE+f"-------------- RESUMO DOS TESTES -------------- \n"+Style.RESET_ALL)