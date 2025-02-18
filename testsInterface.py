from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Configura o WebDriver
driver = webdriver.Chrome()  # Se necessário, passe o caminho do chromedriver

# Abre a página HTML local
driver.get("https://jumpstart.dev.br/")

# Aguarda um pouco para garantir que a página carregou
time.sleep(2)

# Espera o alerta aparecer e clica em "OK"
alerta = driver.switch_to.alert  # Alterna para o alerta
print("Texto do alerta:", alerta.text)  # (Opcional) Imprime o texto do alerta
alerta.accept()  # Clica no botão "OK"

time.sleep(2)

# Acessa o Shadow DOM
shadow_host = driver.find_element(By.CSS_SELECTOR, "signin-component")  # Seleciona o componente
shadow_root = driver.execute_script("return arguments[0].shadowRoot", shadow_host)  # Obtém o Shadow Root

# Preencher o campo de e-mail usando By.ID
usuario_input = shadow_root.find_element(By.ID, "email")
usuario_input.send_keys("marcosoliverc205@gmail.com")

# Preencher o campo de senha usando By.ID
senha_input = shadow_root.find_element(By.ID, "password")
senha_input.send_keys("12345678")

# Clicar no botão de login
botao_login = shadow_root.find_element(By.CSS_SELECTOR, ".containerButton > button")
botao_login.click()

time.sleep(2)

shadow_host = driver.find_element(By.CSS_SELECTOR, "switch-component")  # Seleciona o componente
shadow_root = driver.execute_script("return arguments[0].shadowRoot", shadow_host)  # Obtém o Shadow Root

# Clicar no segundo botão dentro de containerChildrenElements
botao_login = shadow_root.find_element(By.CSS_SELECTOR, ".containerChildrenElements button:nth-of-type(2)")
botao_login.click()

time.sleep(2)


home_component = shadow_root.find_element(By.CSS_SELECTOR, "coin-component")
home_root = driver.execute_script("return arguments[0].shadowRoot", home_component)

# Acessa o ContainerSwitchOption dentro do home-component
container_switch_option = home_root.find_element(By.CSS_SELECTOR, ".wrapButtonSeeMore")


# Acessa o botão "Ver mais" dentro do wrapButtonsGedMore
botao_ver_mais = container_switch_option.find_element(By.CSS_SELECTOR, "button")
botao_ver_mais.click()

time.sleep(3)

home_component2 = driver.find_element(By.CSS_SELECTOR, "assetdetails-component")
home_root2 = driver.execute_script("return arguments[0].shadowRoot", home_component2)

# Acessa o ContainerSwitchOption dentro do home-component
container_switch_option = home_root2.find_element(By.CSS_SELECTOR, ".containerButtons button:nth-of-type(2)")
container_switch_option.click()

time.sleep(2)

home_component2 = driver.find_element(By.CSS_SELECTOR, "buyform-component")
home_root2 = driver.execute_script("return arguments[0].shadowRoot", home_component2)

# Acessa o ContainerSwitchOption dentro do home-component
container_switch_option = home_root2.find_element(By.CSS_SELECTOR, "#containerForm input")
container_switch_option.send_keys(10)

container_switch_option = home_root2.find_element(By.CSS_SELECTOR, "#advanceButton")
container_switch_option.click()
# Aguarda para ver o resultado


time.sleep(2)

home_component4 = driver.find_element(By.CSS_SELECTOR, "buyform-component")
home_root = driver.execute_script("return arguments[0].shadowRoot", home_component4)

home_component = home_root.find_element(By.CSS_SELECTOR, "buyconfirmation-component")
home_root = driver.execute_script("return arguments[0].shadowRoot", home_component)

# Acessa o ContainerSwitchOption dentro do home-component
container_switch_option = home_root.find_element(By.CSS_SELECTOR, ".wrapButton button:nth-of-type(2)")
container_switch_option.click()


time.sleep(10)

# Fecha o navegador
driver.quit()