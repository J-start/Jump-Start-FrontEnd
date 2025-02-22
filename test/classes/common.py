from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class Common:

    def __init__(self, driver):
        self.driver = driver

    def navigateToLoginButton(self):
        time.sleep(2)
        self.clickButtonProfile()
        time.sleep(2)
        self.clickMakeLogin()
    
    def clickButtonProfile(self):
        menuComponent = self.getDOMContaingComponent("menu-component")    
        if menuComponent is None:
            return None
        try:
            buttonProfile = menuComponent.find_element(By.CSS_SELECTOR, '#menu li:nth-child(3) a')
            buttonProfile.click()
            return True
        except Exception as e:
            print("Erro ao clicar no botão de perfil:", str(e))
            return None   
    
    def clickMakeLogin(self):
        userComponent = self.getDOMContaingComponent("user-profile")    
        if userComponent is None:
            return None
        try:
            buttonProfile = userComponent.find_element(By.CSS_SELECTOR, '.containerButtonLogin > a')
            buttonProfile.click()
            return True
        except Exception as e:
            print("Erro ao clicar no botão de login:", str(e))
            return None         

    def clickButtonAlertIntialPage(self):
        try:
            WebDriverWait(self.driver, 5).until(EC.alert_is_present())
            alert = self.driver.switch_to.alert
            alert.accept()
        except Exception as e:
            print("Nenhum alerta encontrado ou erro ao interagir com o alerta:", str(e))

    def loginUserDefault(self):
        if self.insertDatasLogin() is None:
            return
        
        if self.clickButtonLogin() is None:
            return

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