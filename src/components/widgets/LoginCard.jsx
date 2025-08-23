import Logo from "../../assets/Logo.svg";
import Button from "../ui/button/Button";
import Card from "../ui/card/Card.jsx";
import VKLogo from "../../assets/VK.svg";
import YandexLogo from "../../assets/Yandex.svg";
import GitHubLogo from "../../assets/GithubLogo.svg";
import StateServiceLogo from "../../assets/StateService.svg";

const LoginCard = (props) => {
    return (
        <Card className="loginCard">
            <div style={{ marginLeft: "78px" }}>
                <div className="loginLogo">
                    <img src={Logo} alt="Логотип компании" />
                </div>
                <header className="headerLogin">
                    <div
                        style={{
                            fontSize: "32px",
                            fontWeight: "bold",
                            marginRight: "169px",
                        }}
                    >
                        Войти
                    </div>
                    <div
                        style={{
                            fontSize: "20px",
                            flexDirection: "column",
                            alignContent: "center",
                        }}
                    >
                        <a href="">Продолжить как гость</a>
                    </div>
                </header>
                <div>
                    <div>
                        <label htmlFor="email">Почта</label>
                    </div>
                    <input type="text" id="email" />
                </div>
                <div>
                    <div>
                        <label htmlFor="password">Пароль</label>
                    </div>
                    <input type="password" id="password" />
                </div>
                <div>
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe">Запомнить меня</label>
                    <Button className="loginEnterButton"> Войти </Button>
                </div>
                <div>
                    <div>
                        <a href="">Забыли пароль?</a>
                    </div>
                    <div>
                        <a href="">
                            Нет аккаунта? <br /> Зарегистрироваться
                        </a>
                    </div>
                </div>
                <hr />
                <p>или</p>
                <div>Войти с помощью</div>
                <div>
                    <a href="">
                        <img src={VKLogo} alt="VK" />
                    </a>
                    <a href="">
                        <img src={YandexLogo} alt="Yandex" />
                    </a>
                    <a href="">
                        <img src={GitHubLogo} alt="GitHub" />
                    </a>
                    <a href="">
                        <img src={StateServiceLogo} alt="StateServices" />
                    </a>
                </div>
            </div>
        </Card>
    );
};

export default LoginCard;
