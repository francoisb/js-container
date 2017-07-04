describe("Container", function() {
    var
        container,
        Container = require('../source/container');

    beforeEach(function() {
        container = new Container();
    });

    it("should be able to manage a parameter", function() {
        container.set('parameter', 'foo');

        expect(container.get('parameter')).toEqual('foo');
        expect(container.has('parameter'));

        container.unset('parameter');
        expect(!container.has('parameter'));


        var counter = 0;
        container.set('parameter', function() {
            counter++;
            return 'bar'; 
        });

        expect(counter).toEqual(0);
        expect(container.get('parameter')).toEqual('bar');
        expect(container.get('parameter')).toEqual('bar');
        expect(counter).toEqual(2);
        expect(container.has('parameter'));

        container.unset('parameter');
        expect(!container.has('parameter'));
    });

    it("should be able to manage a service", function() {
        var
            service,
            counter = 0;

        container.setShared('service', function() {
            counter++;
            function Service() {};
            service = new Service();
            return service; 
        });

        expect(counter).toEqual(0);
        expect(container.get('service')).toEqual(service);
        expect(container.get('service')).toEqual(service);
        expect(counter).toEqual(1);
        expect(container.has('service'));

        container.unset('service');
        expect(!container.has('service'));
    });
});
