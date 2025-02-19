from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class BuyAsset_test:

    def __init__(self, driver):
        self.driver = driver

    def clickButtonAlertIntialPage(self):
        try:
            WebDriverWait(self.driver, 5).until(EC.alert_is_present())
            alert = self.driver.switch_to.alert
            alert.accept()
        except Exception as e:
            print("Nenhum alerta encontrado ou erro ao interagir com o alerta:", str(e))

    def insertDatasLogin(self):
        signInComponent = self.getDOMContaingComponent("signin-component")
        if signInComponent is None:
            return None

        try:
            emailInput = signInComponent.find_element(By.ID, "email")
            emailInput.send_keys("marcosoliverc205@gmail.com")

            passwordInput = signInComponent.find_element(By.ID, "password")
            passwordInput.send_keys("12345678")

            return True
        except Exception as e:
            print("Erro ao inserir dados do login:", str(e))
            return None

    def loginUserDefault(self):
        if self.insertDatasLogin() is None:
            return
        
        if self.clickButtonLogin() is None:
            return
        
    def clickButtonLogin(self):
        signInComponent = self.getDOMContaingComponent("signin-component")    
        if signInComponent is None:
            return None

        try:
            botao_login = signInComponent.find_element(By.CSS_SELECTOR, ".containerButton > button")
            botao_login.click()
            return True
        except Exception as e:
            print("Erro ao clicar no botão de login:", str(e))
            return None
    
    def clickButtonCoins(self):
        switchDOM = self.getDOMContaingComponent("switch-component")
        if switchDOM is None:
            return
        coinDOM = self.getDOMContaingComponent("switch-component")
        if coinDOM is None:
            return
        try:
            coinButton = coinDOM.find_element(By.CSS_SELECTOR, ".containerChildrenElements button:nth-of-type(2)")
            coinButton.click()
        except Exception as e:
            print("Erro ao clicar no botão referente a moedas:", str(e))

    def clickButtonSeeMoreAboutCoin(self):
        try:
            buttonSeeMore = self.findButtonSeeMoreCoins()
            if buttonSeeMore is None:
                return
            buttonSeeMore.click()
        except Exception as e:
            print("Erro ao clicar no botão referente a ver mais em moedas. Erro:", str(e))        

    def findButtonSeeMoreCoins(self):
        switchDOM = self.getDOMContaingComponent("switch-component")
        if switchDOM is None:
            return None
        
        coinDOM = self.findShadowBasedOn("coin-component",switchDOM)
        if coinDOM is None:
            return None
        
        try:
            containerWrapseeMore = coinDOM.find_element(By.CSS_SELECTOR, ".wrapButtonSeeMore")
            buttonSeeMore = containerWrapseeMore.find_element(By.CSS_SELECTOR, "button")
            return buttonSeeMore
        except Exception as e:    
            print("Erro ao encontrar botão ver mais em moedas. Erro:", str(e)) 
            return None
    
    def clickButtonBuyCoin(self):
        buttonCoin = self.findButtonBuyCoin()
        if buttonCoin is None:
            return 

        try:
            buttonCoin.click()    
        except Exception as e:
            print(f"Erro ao clicar no botão de compra de moeda :", str(e))
            return None  
    
    def insertQuantityToBuyCoin(self):
        inputCoin = self.findFormCoinToInsertQuantity()
        if inputCoin is None:
            return
        
        try:
            inputCoin.send_keys(10)
        except Exception as e:
            print(f"Erro ao inserir quantidade formulario de compra moeda :", str(e))
            return None   

    def clickButtonAdvanceBuyCoin(self):
        buttonAdvance = self.findButtonAdvanceBuyCoin()
        if buttonAdvance is None:
            return None 
        try:
            buttonAdvance.click()
        except Exception as e:
            print(f"Erro clicar em botão avançar mais compra moeda :", str(e))
            return None     

    def clickButtonConfirmationBuyCoin(self):  
        buttonConfirmation = self.findButtonConfirmationBuyCoin()
        if buttonConfirmation is None:
            return 
        
        try:
            buttonConfirmation.click()
        except Exception as e:
            print(f"Erro ao cliccar em botão de confirmação de compra. :", str(e))
            return None

    def findButtonConfirmationBuyCoin(self):
        buyDOM = self.getDOMContaingComponent("buyform-component")
        if buyDOM is None:
            return None
        
        buyConfirmationDOM = self.findShadowBasedOn("buyconfirmation-component",buyDOM)
        if buyConfirmationDOM is None:
            return None
    
        try:
            buttonConfirmation = buyConfirmationDOM.find_element(By.CSS_SELECTOR, ".wrapButton button:nth-of-type(2)")
            return buttonConfirmation
        except Exception as e:
            print(f"Erro ao encontrar botão de confirmação de compra. :", str(e))
            return None
    
    def findButtonAdvanceBuyCoin(self):
        buyFormDOM = self.getDOMContaingComponent("buyform-component")
        if buyFormDOM is None:
            return None 

        try:
            buttonAdvance = buyFormDOM.find_element(By.CSS_SELECTOR, "#advanceButton")
            return buttonAdvance
        except Exception as e:
            print(f"Erro ao encontrar botão de avançar compra de moeda :", str(e))
            return None
         
    def findFormCoinToInsertQuantity(self):
        buyFormDOM = self.getDOMContaingComponent("buyform-component")
        if buyFormDOM is None:
            return None    
        try:    
            inputCoin = buyFormDOM.find_element(By.CSS_SELECTOR, "#containerForm input")
            return inputCoin
        except Exception as e:
            print(f"Erro ao encontrar formulario para inserir quantiddae moeda :", str(e))
            return None   

    def findButtonBuyCoin(self):
        assetDetailsDOM = self.getDOMContaingComponent("assetdetails-component")
        if assetDetailsDOM is None:
            return
    
        try:
            buttonBuy = assetDetailsDOM.find_element(By.CSS_SELECTOR, ".containerButtons button:nth-of-type(2)")
            return buttonBuy
        except Exception as e:
            print(f"Erro ao obter container do botão de comprar moeda. :", str(e))
            return None
        
    def getDOMContaingComponent(self,component):
        try:
            findComponent = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, component)))
            shadowRoot = self.driver.execute_script("return arguments[0].shadowRoot", findComponent)

            if shadowRoot is None:
                return None

            return shadowRoot
        except Exception as e:
            print(f"Erro ao obter o Shadow DOM do ${component}. :", str(e))
            return None
        
    def findShadowBasedOn(self,shadow,based):
        try:
            findComponent = based.find_element(By.CSS_SELECTOR, shadow)
            shadowRoot = self.driver.execute_script("return arguments[0].shadowRoot", findComponent)
            return shadowRoot
        except Exception as e:
            print(f"Erro ao obter o Shadow DOM do ${shadow} baseado em ${based}. :", str(e))
            return None