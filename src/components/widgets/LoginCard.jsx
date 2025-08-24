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
                            marginRight: "150px",
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
                        <a
                            href=""
                            style={{ color: "black", textDecoration: "none" }}
                        >
                            Продолжить как гость
                        </a>
                    </div>
                </header>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <div style={{ fontSize: "20px", marginTop: "24px" }}>
                        <div style={{ marginBottom: "5px" }}>
                            <label htmlFor="email">Почта</label>
                        </div>
                        <input type="text" id="email" className="logninInput" />
                    </div>
                    <div style={{ fontSize: "20px", marginTop: "19px" }}>
                        <div style={{ marginBottom: "5px" }}>
                            <label htmlFor="password">Пароль</label>
                        </div>
                        <input
                            type="password"
                            id="password"
                            className="logninInput"
                        />
                    </div>
                    <div
                        style={{
                            fontSize: "19px",
                            marginTop: "19px",
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        <label className="remember">
                            <input type="checkbox" />
                            <span className="customCheckbox"></span>
                            <div>Запомнить меня</div>
                        </label>
                        <Button className="loginEnterButton"> Войти </Button>
                    </div>
                </form>
                <div>
                    <div>
                        <a
                            href=""
                            style={{
                                color: "black",
                                textDecoration: "none",
                                display: "flex",
                                justifyContent: "center",
                                fontSize: "19px",
                            }}
                        >
                            Забыли пароль?
                        </a>
                    </div>
                    <div>
                        <a
                            href=""
                            style={{
                                color: "black",
                                textDecoration: "none",
                                display: "flex",
                                justifyContent: "center",
                                fontSize: "19px",
                            }}
                        >
                            <div>
                                <div>Нет аккаунта? </div>
                                <div>Зарегистрироваться</div>
                            </div>
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
