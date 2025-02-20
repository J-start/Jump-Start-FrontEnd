from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class CheckSellAsset:

    def __init__(self, driver):
        self.driver = driver


    def verifySellAssetResponse(self):
        response = self.findReponseSellOperation()
        if response is None:
            print("Teste venda de ativo falhou")
            return False
        if str(response) == "Venda realizada com sucesso!":
            print("Teste Venda de ativo realizado com sucesso")
            return True
           

    def findReponseSellOperation(self):
        buyDOM = self.getDOMContaingComponent("selling-component")
        if buyDOM is None:
            return None
        
        sellConfirmationDOM = self.findShadowBasedOn("sellingpro-component",buyDOM)
        if sellConfirmationDOM is None:
            return None

        conclusionDOM = self.findShadowBasedOn("sellingconc-component",sellConfirmationDOM)
        if sellConfirmationDOM is None:
            return None
        
        try:
            status = conclusionDOM.find_element(By.CSS_SELECTOR, ".principalBlock h1")
            return status.text
        except Exception as e:
            print(f"Erro ao obter o status da operação de venda:", str(e))
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
