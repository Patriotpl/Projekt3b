var outImage ="imgg",
    image = new Image(),
    img_src,
    canvas,
    ctx,
    pxData,
    pxSafe,
    pData,
    first = true;


function IMGshow(obj)
{
    if (FileReader)
    {
        document.getElementById("wypelnienie").style.display = "none";
        var reader = new FileReader(),
            red = green = blue = 50,
            alpha = 0,
            neg = gray = false;
        document.getElementById('r').value = document.getElementById('g').value = document.getElementById('b').value = 50;
        document.getElementById('a').value = 0;
        document.getElementById('gray').checked = document.getElementById('neg').checked = false;
        reader.readAsDataURL(obj.files[0]);
        reader.onload = function (e) {
            image.src=e.target.result;
            var img = image;
            image.onload = function () {
                console.log("loop?");
                canvas = document.getElementById('output');
                ctx = canvas.getContext('2d');
                img_src = document.getElementById(outImage).src=image.src;
                canvas.width = document.querySelector('img').width;
                canvas.hieght = document.querySelector('img').height;
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                image.src = document.querySelector('img').src;
                pxData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                pxSafe = ctx.getImageData(0, 0, canvas.width, canvas.height);
                pData = pxData.data;


                //console.log(img.src);
                img.src = document.querySelector('img').src;
                //console.log(img.src);
                first = false;
                a(pxData, pxSafe, pData);
            }
        };
    }
    else alert("Twoja przeglądarka nie wspiera wczytywania plików!");
}

document.getElementById("f5").onclick = function () {
    location.reload();
};

function a(pxData, pxSafe, pData) {
    console.log('a');
    var img = image,
        gray = false,
        neg = false,
        red = 50,
        green = 50,
        blue = 50,
        alpha = 0,
        first = true;
    image.onload = function () {
        console.log("?");
        canvas.hieght = document.querySelector('img').height;
        canvas.width = document.querySelector('img').width;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        document.getElementById('a').value = 0;
    };

    function negf() {
        console.log('negf');
        console.log(pData[500]);
        console.log(first);
        for (var i = 0; i < pData.length; i += 4) {
            pData[i] = 255 - pData[i];
            pData[i+1] = 255 - pData[i+1];
            pData[i+2] = 255 - pData[i+2];
        }
        ctx.putImageData(pxData, 0, 0);
        neg = !neg;
    }

    function grayf() {
        console.log(gray);
        if (!first)
        {

        }
        if (!gray)
        {
            for (var i = 0; i < pData.length; i += 4) {
                var avg = Math.floor((pData[i] + pData[i + 1] + pData[i + 2]) / 3);
                pData[i] = pData[i + 1] = pData[i + 2] = avg;
            }
            ctx.putImageData(pxData, 0, 0);
        }
        else
        {
            pxData = pxSafe;
            if (neg)
            {
                negf();
                neg = true;
            }
            else
            {
                ctx.putImageData(pxData, 0, 0);
            }
        }
        gray = !gray;
    }

    document.getElementById('gray').onclick = function() {
        grayf();
    }
    document.getElementById('neg').onclick = function () {
        negf();
    };
    document.getElementById('r').onchange = function () {
        document.getElementById('br').value = 50;
        if ((this).value > 50) {
            for (var i = 0; i < pData.length; i += 4) {
                if (pData[i] != 255)
                    pData[i] = pxSafe.data[i] + ((this).value) * 0.02 * 255 - 255;
            }
        } else if ((this).value == 50) {
            for (var i = 0; i < pData.length; i += 4) {
                pData[i] = pxSafe.data[i];
            }
        } else {
            for (var i = 0; i < pData.length; i += 4) {
                if (pData[i] != 255)
                    pData[i] = pxSafe.data[i] - (50 - (this).value) * 0.02 * pxSafe.data[i];
            }
        }
        ctx.putImageData(pxData, 0, 0);
        red = (this).value;
        console.log(pData[500]);

    };
    document.getElementById('rreset').onclick = function () {
        red = 50;
        document.getElementById('r').value = 50;
        pxData = pxSafe;
        if (neg)
        {
            negf();
            neg = true;
        }
        if (gray)
        {
            grayf();
            gray = true;
        }
        ctx.putImageData(pxData, 0, 0);
    };
    document.getElementById('g').onchange = function () {
        document.getElementById('br').value = 50;
        if ((this).value > 50) {
            for (var i = 1; i < pData.length; i += 4) {
                pData[i] = pxSafe.data[i] + ((this).value) * 0.02 * 255 - 255;
            }
        } else if ((this).value == 50) {
            for (var i = 1; i < pData.length; i += 4) {
                pData[i] = pxSafe.data[i];
            }
        } else {
            for (var i = 1; i < pData.length; i += 4) {
                pData[i] = pxSafe.data[i] - (50 - (this).value) * 0.02 * pxSafe.data[i];
            }
        }
        ctx.putImageData(pxData, 0, 0);
        green = (this).value;
        console.log(pData[500]);
    };
    document.getElementById('greset').onclick = function () {
        green = 50;
        document.getElementById('g').value = 50;
        pxData = pxSafe;
        if (neg)
        {
            negf();
            neg = true;
        }
        if (gray)
        {
            grayf();
            gray = true;
        }
        ctx.putImageData(pxData, 0, 0);
    };
    document.getElementById('b').onchange = function () {
        document.getElementById('br').value = 50;
        if((this).value > 50)
        {
            for (var i = 2; i < pData.length; i += 4)
            {
                if (pData[i] != 255)
                    pData[i] = pxSafe.data[i] + ((this).value) * 0.02 * 255 - 255;
            }
            console.log('suwak ' + ((this).value) * 0.02 * 255 - 255);
        }
        else if((this).value == 50)
        {
            for (var i = 2; i < pData.length; i += 4)
            {
                pData[i] = pxSafe.data[i];
            }
        }
        else
        {
            for (var i = 2; i < pData.length; i += 4)
            {
                if (pData[i] != 255)
                    pData[i] = pxSafe.data[i] -  (50 - (this).value) * 0.02 * pxSafe.data[i];
            }
            console.log('suwak: ' + pxSafe.data[i] -  (50 - (this).value) * 0.02 * pxSafe.data[i]);
        }
        ctx.putImageData(pxData, 0,0);
        blue = (this).value;
        console.log(pData[502]);
    };
    document.getElementById('breset').onclick = function () {
        blue = 50;
        document.getElementById('b').value = 50;
        pxData = pxSafe;
        if (neg)
        {
            negf();
            neg = true;
        }
        if (gray)
        {
            grayf();
            gray = true;
        }
        ctx.putImageData(pxData, 0, 0);
    };
    document.getElementById('a').onchange = function () {
        for (var i = 3; i < pData.length; i += 4)
        {
            if (pData[i] >= 0 && pData[i] <= 255)
            {
                pData[i] = (100 - (this).value) * 2.55;
            }
        }
        ctx.putImageData(pxData, 0,0);
        alpha = (this).value;
    };
    document.getElementById('areset').onclick = function () {
        alpha = 0;
        document.getElementById('a').value = 0;
        pxData = pxSafe;
        if (neg)
        {
            negf();
            neg = true;
        }
        if (gray)
        {
            grayf();
            gray = true;
        }
        ctx.putImageData(pxData, 0, 0);
    };
    document.getElementById('reset').onclick = function () {
        red = green = blue = 50;
        alpha = 0;
        neg = gray = false;
        document.getElementById('r').value = document.getElementById('g').value = document.getElementById('b').value = 50;
        document.getElementById('a').value = 0;
        document.getElementById('gray').checked = document.getElementById('neg').checked = false;
        pxData = pxSafe;
        ctx.putImageData(pxData, 0, 0);
    };
    document.getElementById('br').onclick = function () {
        document.getElementById('r').value = 50;
        document.getElementById('g').value = 50;
        document.getElementById('b').value = 50;
        for (var i = 0; i < pData.length; i += 4)
        {
            pData[i] = pxSafe.data[i] * (this.value)*0.02;
            pData[i+1] = pxSafe.data[i+1] * (this.value)*0.02;
            pData[i+2] = pxSafe.data[i+2] * (this.value)*0.02;
        }
        ctx.putImageData(pxData, 0, 0);
        console.log(Math.floor((pData[0] + pData[1] + pData[2])/3));
        console.log(' suwak: ' + (this.value) * 0.02 * 255 - 50);
    };

}
