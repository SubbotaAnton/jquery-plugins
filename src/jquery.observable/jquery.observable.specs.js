describe('jquery.observable specs', function() {

    var observable, fn1, fn2, fn3;

    beforeEach(function() {
        observable = new $.observable();
        fn1 = jasmine.createSpy();
        fn2 = jasmine.createSpy();
        fn3 = jasmine.createSpy();
    });

    describe('on, once and trigger methods specs', function() {
        it('should be valid callbacks called', function() {
            observable.on('e1', fn1);
            observable.on('e1', fn2);
            observable.on('e2', fn3);
            observable.trigger('e1');

            expect(fn1).toHaveBeenCalled();
            expect(fn2).toHaveBeenCalled();
            expect(fn3).not.toHaveBeenCalled();
        });

        it('should be callback called once', function() {
            observable.once('e1', fn1);
            observable.trigger('e1');
            observable.trigger('e1');

            expect(fn1.callCount).toEqual(1);
        });

        it('should be valid default callback\'s context', function() {
            var calledCtx,
                f = function() { calledCtx = this };

            observable.on('e1', f);
            observable.trigger('e1');

            expect(calledCtx).toBe(observable);
        });

        it('should be valid custom callback\'s context', function() {
            var ctx = {},
                calledCtx,
                f = function() { calledCtx = this };

            observable.on('e1', f, ctx);
            observable.trigger('e1');

            expect(calledCtx).toBe(ctx);
        });
    });

    describe('un method specs', function() {
        it('should be concrete callback unbinded', function() {
            observable.on('e1', fn1);
            observable.on('e1', fn2);
            observable.on('e2', fn3);
            observable.un('e1', fn1);
            observable.trigger('e1');
            observable.trigger('e2');

            expect(fn1).not.toHaveBeenCalled();
            expect(fn2).toHaveBeenCalled();
            expect(fn3).toHaveBeenCalled();
        });

        it('should be all callbacks on concrete event unbinded', function() {
            observable.on('e1', fn1);
            observable.on('e1', fn2);
            observable.on('e2', fn3);
            observable.un('e1');
            observable.trigger('e1');
            observable.trigger('e2');

            expect(fn1).not.toHaveBeenCalled();
            expect(fn2).not.toHaveBeenCalled();
            expect(fn3).toHaveBeenCalled();
        });

        it('should be all callbacks unbinded', function() {
            observable.on('e1', fn1);
            observable.on('e1', fn2);
            observable.on('e2', fn3);
            observable.un();
            observable.trigger('e1');
            observable.trigger('e2');

            expect(fn1).not.toHaveBeenCalled();
            expect(fn2).not.toHaveBeenCalled();
            expect(fn3).not.toHaveBeenCalled();
        });

        it('should be expected default target', function() {
            observable.on('e1', fn1);
            observable.trigger('e1');

            expect(fn1.mostRecentCall.args[0].target).toBe(observable);
        });

        it('should be expected custom target', function() {
            var target = {},
                e = $.Event('e1', { target : target });
            observable.on('e1', fn1);
            observable.trigger(e);

            expect(fn1.mostRecentCall.args[0].target).toBe(target);
        });
    });

});