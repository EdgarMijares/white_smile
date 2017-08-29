<?php 
	include 'class.inputfilter.php';
    $filtro = new InputFilter();

    function post_captcha($user_response) {
        $fields_string = '';
        $fields = array(
            'secret' => '6Le14SsUAAAAAF9IPaAcNcoWtuPqT0YoLl4poD49',
            'response' => $user_response
        );
        foreach($fields as $key=>$value)
        $fields_string .= $key . '=' . $value . '&';
        $fields_string = rtrim($fields_string, '&');

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, count($fields));
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $result = curl_exec($ch);
        curl_close($ch);

        return json_decode($result, true);
    }
    $res = post_captcha($_POST['g-recaptcha-response']);

    if (!$res['success']) {
        echo "<script language=JavaScript>alert('El mensaje no pudo ser enviado.');</script>";
    } else {
        $destino = "dentalws.dgo@gmail.com";
        $asunto = $filtro->process($_POST['asunto']);
        $nombre = $filtro->process($_POST['nombre']);
        $telefono =  $filtro->process($_POST['tel']);
        $email = $filtro->process($_POST["email"]);
        $asunto = $filtro->process($_POST["comentario"]);

        $comentario = "Nombre: " . $nombre . "\nTelefono: " . $telefono . "\nCorreo: " . $email . "\nMensaje: " . $asunto;

        $asuntode = $asunto . "Contactar a " . $nombre;
        $headers= 'Form:'.$_POST['email'] . "\r\n" . 'Reply-To:'.$_POST['email']."\r\n".'X-Mailer:PHP/'.phpversion();
        mail($destino, $asuntode, $comentario,  $headers);
        echo "<script language=JavaScript>alert('Mensaje enviado con exito.');</script>";
        header("Location:index.html");
        //echo '<br><p>CAPTCHA was completed successfully!</p><br>';
    }
?>