import Head from 'next/head';
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import styles from '@/styles/Login.module.css'; // sistem performansı için css dosyalarını modüller halinde import ediyoruz
import {useState} from "react";

const Login = () => {
    const [loading, setLoading] = useState(false); // loading durumunu tutacağımız state'i tanımlıyoruz
    const router = useRouter(); // router hook'unu kullanarak sayfalar arası geçiş yapacağız
    const {register, handleSubmit} = useForm(); // react hook form kütüphanesini kullanarak formu yöneteceğiz
    const onSubmit = async (data) => { // react hook form kütüphanesini kullanarak formu submit ediyoruz
        setLoading(true); // loading durumunu true yapıyoruz
        if (data.email === "" || data.password === "") { // if ile email ve password alanlarının boş olup olmadığını kontrol ediyoruz
            alert("Please fill all the fields"); // boş ise uyarı veriyoruz
            setLoading(false); // loading durumunu false yapıyoruz
        } else { // boş değilse
            setTimeout(() => { // simülasyon için 2 saniye bekletiyoruz
                setLoading(false);
                router.push("/"); // anasayfaya yönlendiriyoruz
            }, 2000);
        }
    };
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.headText}>MANAGE COURSES</div>
                    <div className={styles.headSubText}>SIGN IN</div>
                    <div className={styles.descText}>Enter your credentials to access your account</div>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.formBlock}>
                            <label className={styles.formLabel} htmlFor={"email"}>Email</label>
                            <input className={styles.formInput} disabled={loading} {...register("email")} type={"email"}
                                   id={"email"}
                                   placeholder={"Enter your email"}/>
                        </div>
                        <div className={styles.formBlock}>
                            <label className={styles.formLabel} htmlFor={"password"}>Password</label>
                            <input className={styles.formInput} disabled={loading} {...register("password")}
                                   type={"password"} id={"password"}
                                   placeholder={"Enter your password"}/>
                        </div>
                        <button disabled={loading} className={styles.formButton} type={"submit"}>
                            {loading ? "Verifying..." : "SIGN IN"}
                        </button>
                    </form>
                    <div className={styles.forgotBlock}>
                        <span className={styles.forgotText}>Forgot your password?</span> <a
                        className={styles.forgotLink} href={"/"}>Reset Password</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
