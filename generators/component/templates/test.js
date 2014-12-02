define(['<%= modulePath %>'], function(component) {
    var <%= viewModelClassName %> = component.viewModel;

    describe('<%= name %>', function() {

        it('should supply a friendly message', function() {
            var instance = new <%= viewModelClassName %>();
            expect(instance.message()).toContain('Hello from ');
        });

        it('should fail', function(){
           expect(1 + 1).toBe(3);
        });

    });

});