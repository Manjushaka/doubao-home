function money() {
    const $buyDiv = document.querySelector(".tb-btn-buy");
    const $buyA = $buyDiv.querySelector("#J_LinkBuy");
    let hasClickBuyA = false;
    let sssss = "";
    let a = b;

    const interval1 = setInterval(() => {
        if (!$buyDiv.classList.contains("tb-hidden") && !hasClickBuyA) {
            $buyA.click();
            console.log("hasClickBuyA");
            let hasClickConfim = false;

            // 点击立即购买之后，重新打开了一个新的页面，这段脚本不会自动执行。如何才能让它自动执行呢？
            const interval2 = setInterval(() => {
                const $confirmBuy = document.querySelector(".go-btn");
                console.log("2: ", $confirmBuy, hasClickConfim);
                if (!hasClickConfim && $confirmBuy) {
                    $confirmBuy.click();
                    console.log("hasClickConfirm");
                    hasClickConfim = true;
                    clearInterval(interval2);
                }
            }, 50);

            hasClickBuyA = true;
            clearInterval(interval1);
        }
    }, 50);
}

function startMoney(hours, minutes) {
    let hasStart = false;
    console.log("time: ", hours, minutes);
    const interval0 = setInterval(() => {
        const date = new Date();

        if (
            !hasStart &&
            date.getHours() === hours &&
            date.getMinutes() === minutes
        ) {
            money();
            console.log("money");
            hasStart = true;
            clearInterval(interval0);
        }
    }, 100);
}
