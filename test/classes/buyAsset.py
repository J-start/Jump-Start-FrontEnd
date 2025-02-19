from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class BuyAsset_test:

    def __init__(self, driver):
        self.driver = driver
    


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