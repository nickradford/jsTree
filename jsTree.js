(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  }, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $(function() {
    var Aaron, Blase, Brad, Eric, Nick, Node, NodeCollection, Tom, TreeView, arr, ctx, flattenTree, lineargradient, tv, winH, winW;
    NodeCollection = (function() {
      __extends(NodeCollection, Backbone.Collection);
      function NodeCollection() {
        NodeCollection.__super__.constructor.apply(this, arguments);
      }
      return NodeCollection;
    })();
    Node = (function() {
      __extends(Node, Backbone.Model);
      function Node() {
        this.draw = __bind(this.draw, this);
        this.addChild = __bind(this.addChild, this);
        Node.__super__.constructor.apply(this, arguments);
      }
      Node.prototype.initialize = function() {
        return this.set({
          children: new NodeCollection()
        });
      };
      Node.prototype.addChild = function(child) {
        var children;
        children = this.get('children');
        child.set({
          parentID: this.cid
        });
        children.add(child);
        return this.set({
          children: children
        });
      };
      Node.prototype.draw = function() {
        return "<div class='node'>" + (this.get('name')) + "</div>";
      };
      return Node;
    })();
    TreeView = (function() {
      __extends(TreeView, Backbone.View);
      function TreeView() {
        TreeView.__super__.constructor.apply(this, arguments);
      }
      TreeView.prototype.el = $('#jsTree');
      TreeView.prototype.render = function() {
        var data, gen, html, it_gen, name, node, _i, _len;
        data = this.options.data;
        data = _.sortBy(data, function(item) {
          return item.get('generation');
        });
        gen = 0;
        html = "<div class='gen-" + gen + "'>";
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          node = data[_i];
          it_gen = node.get('generation');
          console.log(gen, it_gen);
          if (it_gen !== gen) {
            gen = it_gen;
            html += "</div><div class='gen-" + gen + "'>";
          }
          name = node.get('name');
          html += "<div class='node'>" + name + "</div>";
        }
        html += "</div>";
        return $(this.el).append(html);
      };
      return TreeView;
    })();
    flattenTree = function(node, arr) {
      var children;
      if (arr == null) {
        arr = [];
      }
      children = node.get('children').models;
      arr.push(node);
      if (children.length === 0) {
        return arr;
      }
      if (children.length !== 0) {
        return _.each(node.get('children').models, function(item) {
          return flattenTree(item, arr);
        });
      }
    };
    Tom = new Node({
      name: "Tom Frank",
      generation: 0
    });
    Nick = new Node({
      name: "Nick Radford",
      generation: 1
    });
    Brad = new Node({
      name: "Brad Wilson",
      generation: 2
    });
    Eric = new Node({
      name: "Eric Juzkiw",
      generation: 2
    });
    Blase = new Node({
      name: "Blase King",
      generation: 2
    });
    Aaron = new Node({
      name: "Aaron Rice",
      generation: 3
    });
    Blase.addChild(Aaron);
    Nick.addChild(Blase);
    Nick.addChild(Brad);
    Nick.addChild(Eric);
    Tom.addChild(Nick);
    arr = [];
    flattenTree(Tom, arr);
    tv = new TreeView({
      data: arr
    });
    if (document.body && document.body.offsetWidth) {
      winW = document.body.offsetWidth;
      winH = document.body.offsetHeight;
    }
    if (document.compatMode && 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) {
      winW = document.documentElement.offsetWidth;
      winH = document.documentElement.offsetHeight;
    }
    if (window.innerWidth && window.innerHeight) {
      winW = window.innerWidth;
      winH = window.innerHeight;
    }
    $('canvas').attr('height', winH);
    $('canvas').attr('width', winW);
    ctx = $('canvas')[0];
    ctx = ctx.getContext('2d');
    lineargradient = ctx.createLinearGradient(0, 0, 0, winW);
    lineargradient.addColorStop(0, '#eee');
    lineargradient.addColorStop(1, '#ccc');
    ctx.fillStyle = lineargradient;
    ctx.fillRect(0, 0, winW, winH);
    return window.ctx = ctx;
  });
}).call(this);
