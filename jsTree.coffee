$ ->
    class NodeCollection extends Backbone.Collection              


    class Node extends Backbone.Model    
        initialize: () ->
            @set {children: new NodeCollection()}
    
        addChild: (child) =>
            # console.log @cid
            children = @get 'children'
            child.set {parentID: @cid}
            children.add child
            @set {children: children}
    
        draw: =>
            return "<div class='node'>#{@get('name')}</div>"
        
    class TreeView extends Backbone.View
        el: $('#jsTree')
        render: () -> 
            data = @options.data
            data = _.sortBy(data, (item) -> return item.get 'generation' )
            gen = 0
            html = "<div class='gen-#{gen}'>"
            for node in data
                it_gen = node.get 'generation'
                console.log gen, it_gen
                if it_gen isnt gen
                    gen = it_gen
                    html += "</div><div class='gen-#{gen}'>"
            
                name = node.get 'name'
                html += "<div class='node'>#{name}</div>"
            html += "</div>"
            
            $(@el).append html    
            

      
        
    flattenTree = (node, arr = []) ->
        children = node.get('children').models
    
        arr.push node
    
        if children.length is 0
            return arr
    
        unless children.length is 0
            return _.each(node.get('children').models, (item) -> flattenTree item, arr)
    

    Tom = new Node
        name: "Tom Frank"
        generation: 0
    
    Nick = new Node
        name: "Nick Radford"
        generation: 1
        
    Brad = new Node
        name: "Brad Wilson"
        generation: 2

    Eric = new Node
        name: "Eric Juzkiw"
        generation: 2
    
    Blase = new Node
        name: "Blase King"
        generation: 2

    Aaron = new Node
        name: "Aaron Rice"
        generation: 3
    
    Blase.addChild(Aaron)
    Nick.addChild(Blase)
    Nick.addChild(Brad)
    Nick.addChild(Eric)
    Tom.addChild(Nick)

    arr = []
    flattenTree Tom, arr

    tv = new TreeView { data: arr }
    # console.log tv
    # tv.render();
    
    
    if document.body and document.body.offsetWidth
        winW = document.body.offsetWidth;
        winH = document.body.offsetHeight;
    
    if  document.compatMode and 'CSS1Compat' and document.documentElement and document.documentElement.offsetWidth
        winW = document.documentElement.offsetWidth;
        winH = document.documentElement.offsetHeight;
    
    if window.innerWidth and window.innerHeight
        winW = window.innerWidth;
        winH = window.innerHeight;
    
    $('canvas').attr('height', winH)
    $('canvas').attr('width', winW)
    
    ctx = $('canvas')[0]
    
    ctx = ctx.getContext('2d')
    # ctx.fillStyle = '#CCC'
    #
    
    lineargradient = ctx.createLinearGradient(0,0,0,winW);
    lineargradient.addColorStop(0,'#eee');
    lineargradient.addColorStop(1,'#ccc');
    
    ctx.fillStyle = lineargradient
    ctx.fillRect(0, 0, winW, winH)
    window.ctx = ctx