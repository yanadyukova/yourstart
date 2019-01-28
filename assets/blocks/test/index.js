export default class Test {
    constructor() {
        this.container = $('.jsTest');
        this.baseLine = [
            { active: true, el: $('.jsTestStart') },
            { active: false, el: $('.jsTestStage') },
            { active: false, el: $('.jsTestFinish') }
        ];
        this.issuesLine = $('.jsTestList > .test-stage__item');
        this.issuesActive = this.issuesLine.filter('.active');

        this.buttonNext = $('.jsTestNext');
        this.buttonVote = $('.jsTestVote');
        this.buttonChooseAnswer = $('.jsTestChooseAnswer');

        this.paginationAll = $('.jsTestPagination');
    }
    run() {
        const _this = this;

        this.buttonNext.click(() => {
            this.next();
        });

        this.buttonVote.click(() => {
            this.vote();
        });

        this.buttonChooseAnswer.click(function() {
            let containerError = $(this).closest('.test-stage__item').find('.error');

            containerError.slideUp();
            $(this).closest('.test-list__item').toggleClass('current answered').siblings().removeClass('current answered');

            if ($(this).closest('.test-list__item').hasClass('current')) {
                _this.buttonVote.removeClass('disabled');
            } else {
                _this.buttonVote.addClass('disabled');
            }
        });

        this.buttonVote.addClass('disabled');
        this.lazyLoad(this.issuesActive.find('img'));
    }

    next() {
        let pages = this.baseLine,
            pagesLength = pages.length - 1,
            found = false,
            currentPage,
            nextPage;

        for (var i = 0; i < pages.length; i++) {
            if (pages[i].active && !found) {
                found = true;
                currentPage = pages[i];
                currentPage.active = false;

                if (i === pagesLength) {
                    nextPage = pages[0];
                    nextPage.active = true;
                } else {
                    nextPage = pages[i + 1];
                    nextPage.active = true;
                }

                if (i === 1) {
                    this.scrollUp();
                } else if (i === pagesLength) {
                    this.refresh();
                }

                if (i === 0) {
                    this.beforeUnload(true);
                } else if (i === 1) {
                    this.beforeUnload(false);
                }

                currentPage.el.hide();
                nextPage.el.fadeIn();
            }
        }
    }

    vote() {
        let containerError = this.issuesActive.find('.error'),
            selectedAnswer = this.issuesActive.find('.test-list__item.current');

        if (this.container.hasClass('test_abcd')) {
            if (this.validateVote()) {
                this.nextQuestion();
            }
            return;
        }

        if (this.validateVote()) {
            if (this.issuesActive.hasClass('done')) {
                this.nextQuestion();
            } else {
                this.checkAnswer();
            }
        }
    }

    validateVote() {
        if (this.issuesActive.filter('.done').length) {
            return true;
        }

        let containerError = this.issuesActive.find('.error'),
            selectedAnswer = this.issuesActive.find('.test-list__item.current'),
            isValid = false;

        if (selectedAnswer.length) {
            isValid = true;
            containerError.slideUp();
        } else {
            containerError.slideDown();
        }

        return isValid;
    }

    checkAnswer() {
        let items = this.issuesActive.find('.test-list__item');

        for (let item of items) {
            let _this = $(item),
                current = _this.hasClass('current'),
                correct = _this.data('true');

            if (correct && current) {
                _this.addClass('true');
                _this.find('.test-list__answer').fadeIn();
            } else if (correct) {
                _this.addClass('false_true');
            } else if (current) {
                _this.addClass('false');
                _this.find('.test-list__answer').fadeIn();
            } else {
                _this.addClass('disabled');
            }

            _this.removeClass('current');
            _this.find('.jsTestChooseAnswer').attr('disabled', true);
        }

        this.issuesActive.addClass('done');
        this.issuesActive = this.issuesLine.filter('.active');

        // alert('отвечено');
    }

    nextQuestion() {
        let next = this.issuesActive.next();

        if (next.length) {
            this.issuesActive.removeClass('active').hide();
            next.addClass('active').fadeIn();
            this.issuesActive = this.issuesLine.filter('.active');
            this.lazyLoad(this.issuesActive.find('img'));
            this.pagination();
            // this.scrollUp(300);
        } else {
            this.next();
            this.result();
        }

        this.buttonVote.addClass('disabled');
    }

    result() {
        let testId = $('.jsTest').data('test-id'),
            testAnswers = '';

        $('.answered button[data-answer-id]').each(function() {
            testAnswers = testAnswers + $(this).data('answer-id') + ', ';
        });
        testAnswers = testAnswers.slice(0, -2);

        if (!testId) {
            console.log('не найден аттрибут test-id');
            return;
        }

        $.post(`/api/test/${testId}/result`, {
            answers: testAnswers,
            test_locale_code: $('input[name="test_locale_code"]').val()
        }, function(data) {
            if (data.status == 'Ok') {
                // $('.test-finish__title').text(data.data.title);
                $('.test-finish__desc').html(data.data.text);
                $('.test-finish__pic img').attr('src', data.data.image);
                $('.test-finish__social .social').attr('data-url', data.data.share_url);
            } else {
                $('.jsModalErrorTest').modal('show');
            }
        });
    }

    refresh() {
        this.issuesLine.removeClass('active done').eq(0).addClass('active').show();
        this.issuesLine.find('.test-list__item').removeClass().addClass('test-list__item').find('.test-list__answer').hide();
        this.issuesLine.find('.jsTestChooseAnswer').attr('disabled', false);
        this.issuesActive = this.issuesLine.filter('.active');
        this.pagination();
    }

    scrollUp(speedValue) {
        let baseAnimate = $('html, body'),
            isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
            offset = 15,
            speed = speedValue ? speedValue : 0;

        if (isFirefox) {
            baseAnimate = $('html');
        }

        baseAnimate.animate({scrollTop: $('.jsTestStage').offset().top + offset}, speed);
    }

    pagination() {
        this.paginationAll.text(this.issuesActive.index() + 1);
    }

    lazyLoad(img) {
        if (img.hasClass('init')) return;

        let source = img.data('src');
        img.attr('src', source).addClass('init');
    }

    beforeUnload(state) {
        if (state) {
            $(window).on('beforeunload', function(){
                return "Вы действительно хотите покинуть тест? Результаты прохождения будут потеряны";
            });
        } else {
            $(window).off('beforeunload');
        }
    }
}
