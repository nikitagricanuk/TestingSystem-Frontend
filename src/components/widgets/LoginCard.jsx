import Logo from "../../assets/Logo.svg";
import Button from "../ui/button/Button";

const LoginCard = (props) => {
    return (
        <div>
            <div className="loginCard">
                <img src={Logo} alt="Логотип компании" />
                <header className="headerLogin">
                    <span>Войти</span>
                    <span>Продолжить как гость</span>
                </header>
                <label htmlFor="email">Почта</label>
                <input type="text" id="email" />
                <label htmlFor="password">Пароль</label>
                <input type="password" id="password" />
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Запомнить меня</label>
                <Button className="loginEnterButton"> Войти </Button>
                <a href="">Забыли пароль?</a>
                <a href="">
                    Нет аккаунта? <br /> Зарегистрироваться
                </a>
                <hr />
                или
                <span>Войти с помощью</span>
                <img src="" alt="VK" />
                <img src="" alt="Yandex" />
                <img src="" alt="GitHub" />
                <img src="" alt="StateServices" />
            </div>
        </div>
    );
};

export default LoginCard;
