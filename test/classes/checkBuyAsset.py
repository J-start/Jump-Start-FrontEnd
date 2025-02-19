from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class CheckBuyAsset:

    def __init__(self, driver):
        self.driver = driver


    def verifyBuyAssetResponse(self):
        response = self.findReponseBuyOperation()
        if response is None:
            print("Teste Compra de ativo falhou")
            return False
        if str(response) == "Compra realizada com sucesso!":
            print("Teste Compra de ativo realizado com sucesso")
            return True
           

    def findReponseBuyOperation(self):
        buyDOM = self.getDOMContaingComponent("buyform-component")
        if buyDOM is None:
            return None
        
        buyConfirmationDOM = self.findShadowBasedOn("buyconfirmation-component",buyDOM)
        if buyConfirmationDOM is None:
            return None

        conclusionDOM = self.findShadowBasedOn("sellingconc-component",buyConfirmationDOM)
        if buyConfirmationDOM is None:
            return None
        
        try:
            status = conclusionDOM.find_element(By.CSS_SELECTOR, ".principalBlock h1")
            return status.text
        except Exception as e:
            print(f"Erro ao obter o status da operação de compra:", str(e))
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
