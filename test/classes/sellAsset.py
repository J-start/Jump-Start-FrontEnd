from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class SellAsset:

    def __init__(self, driver):
        self.driver = driver

    def clickButtonSellAsset(self):
        buttonBuy = self.findButtonBuyCoin()
        if buttonBuy is None:
            return
        
        try:
            buttonBuy.click()
        except Exception as e:
            raise Exception("Erro ao clicar no botão de vender ativo. Erro: ",str(e))
        
    def insertQuantityToSell(self):
        inputCoin = self.findFormCoinToInsertQuantity()
        if inputCoin is None:
            return
        
        try:
            inputCoin.send_keys(10)
        except Exception as e:
            raise Exception(f"Erro ao inserir quantidade formulario de venda moeda :", str(e))
    
    def clickButtonAdvanceToSell(self):
        buttonAdvance = self.findButtonAdvanceBuyCoin()
        if buttonAdvance is None:
            return None 
        try:
            buttonAdvance.click()
        except Exception as e:
            raise Exception(f"Erro clicar em botão avançar mais vender moeda :", str(e))
    
    def clickButtonConfirmationSellAsset(self):
        buttonSell = self.findButtonConfirmationSellCoin()
        if buttonSell is None:
            return
        
        try:
             buttonSell.click()
        except Exception as e:
            raise Exception(f"Erro clicar em botão confirmar venda moeda :", str(e))           

    def findButtonConfirmationSellCoin(self):
        sellDOM = self.getDOMContaingComponent("selling-component")
        if sellDOM is None:
            return None
        
        sellConfirmationDOM = self.findShadowBasedOn("sellingpro-component",sellDOM)
        if sellConfirmationDOM is None:
            return None
    
        try:
            buttonConfirmation = sellConfirmationDOM.find_element(By.CSS_SELECTOR, ".buttonSell #sellAsset")
            return buttonConfirmation
        except Exception as e:
            raise Exception(f"Erro ao encontrar botão de confirmação de compra. :", str(e)) 
        
    def findButtonAdvanceBuyCoin(self):
        buyFormDOM = self.getDOMContaingComponent("selling-component")
        if buyFormDOM is None:
            return None 

        try:
            buttonAdvance = buyFormDOM.find_element(By.CSS_SELECTOR, "#insertValueOperation")
            return buttonAdvance
        except Exception as e:
            raise Exception(f"Erro ao encontrar botão de avançar compra de moeda :", str(e)) 

    
    def findFormCoinToInsertQuantity(self):
        buyFormDOM = self.getDOMContaingComponent("selling-component")
        if buyFormDOM is None:
            return None    
        try:    
            inputCoin = buyFormDOM.find_element(By.CSS_SELECTOR, 'form #valueInput')
            return inputCoin
        except Exception as e:
            raise Exception(f"Erro ao encontrar formulario para inserir quantiddae moeda :", str(e))

    def findButtonBuyCoin(self):
        assetDetailsDOM = self.getDOMContaingComponent("assetdetails-component")
        if assetDetailsDOM is None:
            return
    
        try:
            buttonBuy = assetDetailsDOM.find_element(By.CSS_SELECTOR, ".containerButtons button:nth-of-type(1)")
            return buttonBuy
        except Exception as e:
            raise Exception(f"Erro ao obter container do botão de comprar moeda. :", str(e))

    def getDOMContaingComponent(self,component):
        try:
            findComponent = WebDriverWait(self.driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, component)))
            shadowRoot = self.driver.execute_script("return arguments[0].shadowRoot", findComponent)

            if shadowRoot is None:
                return None

            return shadowRoot
        except Exception as e:
            raise Exception(f"Erro ao obter o Shadow DOM do ${component}. :", str(e))
        
    def findShadowBasedOn(self,shadow,based):
        try:
            findComponent = based.find_element(By.CSS_SELECTOR, shadow)
            shadowRoot = self.driver.execute_script("return arguments[0].shadowRoot", findComponent)
            return shadowRoot
        except Exception as e:
            raise Exception(f"Erro ao obter o Shadow DOM do ${shadow} baseado em ${based}. :", str(e))