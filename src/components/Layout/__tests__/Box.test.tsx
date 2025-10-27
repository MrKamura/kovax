import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Box } from '../Box';

describe('Box Component', () => {
  // Basic Rendering Tests
  describe('Basic Rendering', () => {
    test('renders as div by default', () => {
      render(<Box>Box content</Box>);
      const box = screen.getByText('Box content');
      expect(box.tagName).toBe('DIV');
    });

    test('renders with children', () => {
      render(<Box>Test content</Box>);
      expect(screen.getByText('Test content')).toBeTruthy();
    });

    test('renders with React node children', () => {
      render(
        <Box>
          <span>Span content</span>
          <strong>Strong content</strong>
        </Box>
      );
      expect(screen.getByText('Span content')).toBeTruthy();
      expect(screen.getByText('Strong content')).toBeTruthy();
    });
  });

  // Semantic Elements Tests
  describe('Semantic Elements', () => {
    test('renders as section', () => {
      render(<Box as="section">Section content</Box>);
      const element = screen.getByText('Section content');
      expect(element.tagName).toBe('SECTION');
    });

    test('renders as header', () => {
      render(<Box as="header">Header content</Box>);
      const element = screen.getByText('Header content');
      expect(element.tagName).toBe('HEADER');
    });

    test('renders as footer', () => {
      render(<Box as="footer">Footer content</Box>);
      const element = screen.getByText('Footer content');
      expect(element.tagName).toBe('FOOTER');
    });

    test('renders as main', () => {
      render(<Box as="main">Main content</Box>);
      const element = screen.getByText('Main content');
      expect(element.tagName).toBe('MAIN');
    });

    test('renders as article', () => {
      render(<Box as="article">Article content</Box>);
      const element = screen.getByText('Article content');
      expect(element.tagName).toBe('ARTICLE');
    });

    test('renders as nav', () => {
      render(<Box as="nav">Nav content</Box>);
      const element = screen.getByText('Nav content');
      expect(element.tagName).toBe('NAV');
    });

    test('renders as span', () => {
      render(<Box as="span">Span content</Box>);
      const element = screen.getByText('Span content');
      expect(element.tagName).toBe('SPAN');
    });

    test('renders as paragraph', () => {
      render(<Box as="p">Paragraph content</Box>);
      const element = screen.getByText('Paragraph content');
      expect(element.tagName).toBe('P');
    });

    test('renders as heading elements', () => {
      const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
      
      headings.forEach(heading => {
        const { unmount } = render(<Box as={heading}>{heading} content</Box>);
        const element = screen.getByText(`${heading} content`);
        expect(element.tagName).toBe(heading.toUpperCase());
        unmount();
      });
    });
  });

  // Interactive Elements Tests
  describe('Interactive Elements', () => {
    test('renders as anchor with href', () => {
      render(<Box as="a" href="/test">Link</Box>);
      const link = screen.getByText('Link');
      expect(link.tagName).toBe('A');
      expect(link.getAttribute('href')).toBe('/test');
    });

    test('renders as button with type', () => {
      render(<Box as="button" type="submit">Submit</Box>);
      const button = screen.getByText('Submit');
      expect(button.tagName).toBe('BUTTON');
      expect(button.getAttribute('type')).toBe('submit');
    });

    test('renders disabled button', () => {
      render(<Box as="button" disabled>Disabled</Box>);
      const button = screen.getByText('Disabled') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
    });

    test('renders as input with placeholder', () => {
      render(<Box as="input" placeholder="Enter text" />);
      const input = screen.getByPlaceholderText('Enter text') as HTMLInputElement;
      expect(input.tagName).toBe('INPUT');
    });

    test('renders as textarea', () => {
      render(<Box as="textarea" rows={5}>Textarea content</Box>);
      const textarea = screen.getByText('Textarea content') as HTMLTextAreaElement;
      expect(textarea.tagName).toBe('TEXTAREA');
      expect(textarea.rows).toBe(5);
    });

    test('renders as form', () => {
      render(<Box as="form" action="/submit" method="post">Form content</Box>);
      const form = screen.getByText('Form content');
      expect(form.tagName).toBe('FORM');
      expect(form.getAttribute('action')).toBe('/submit');
      expect(form.getAttribute('method')).toBe('post');
    });

    test('renders as label with htmlFor', () => {
      render(<Box as="label" htmlFor="input-id">Label text</Box>);
      const label = screen.getByText('Label text');
      expect(label.tagName).toBe('LABEL');
      expect(label.getAttribute('for')).toBe('input-id');
    });

    test('renders as image', () => {
      render(<Box as="img" src="image.jpg" alt="Test image" />);
      const img = screen.getByAltText('Test image') as HTMLImageElement;
      expect(img.tagName).toBe('IMG');
      expect(img.src).toContain('image.jpg');
    });

    test('renders as select', () => {
      render(<Box as="select" multiple><option>Option 1</option></Box>);
      const select = screen.getByRole('listbox') as HTMLSelectElement;
      expect(select.tagName).toBe('SELECT');
      expect(select.multiple).toBe(true);
    });
  });

  // Spacing and Sizing Tests
  describe('Spacing and Sizing', () => {
    test('applies width and height', () => {
      render(<Box w="100px" h="50px">Sized box</Box>);
      const box = screen.getByText('Sized box');
      expect(box.style.width).toBe('100px');
      expect(box.style.height).toBe('50px');
    });

    test('applies min and max dimensions', () => {
      render(
        <Box minW="200px" maxW="500px" minH="100px" maxH="300px">
          Constrained box
        </Box>
      );
      const box = screen.getByText('Constrained box');
      expect(box.style.minWidth).toBe('200px');
      expect(box.style.maxWidth).toBe('500px');
      expect(box.style.minHeight).toBe('100px');
      expect(box.style.maxHeight).toBe('300px');
    });

    test('applies margin', () => {
      render(<Box m={16}>With margin</Box>);
      const box = screen.getByText('With margin');
      expect(box.style.margin).toBe('16px');
    });

    test('applies individual margins', () => {
      render(<Box mt={8} mr={12} mb={16} ml={4}>Individual margins</Box>);
      const box = screen.getByText('Individual margins');
      expect(box.style.marginTop).toBe('8px');
      expect(box.style.marginRight).toBe('12px');
      expect(box.style.marginBottom).toBe('16px');
      expect(box.style.marginLeft).toBe('4px');
    });

    test('applies padding', () => {
      render(<Box p={12}>With padding</Box>);
      const box = screen.getByText('With padding');
      expect(box.style.padding).toBe('12px');
    });

    test('applies individual padding', () => {
      render(<Box pt={6} pr={10} pb={14} pl={2}>Individual padding</Box>);
      const box = screen.getByText('Individual padding');
      expect(box.style.paddingTop).toBe('6px');
      expect(box.style.paddingRight).toBe('10px');
      expect(box.style.paddingBottom).toBe('14px');
      expect(box.style.paddingLeft).toBe('2px');
    });

    test('applies horizontal and vertical spacing', () => {
      render(<Box mx={8} my={12}>Axis spacing</Box>);
      const box = screen.getByText('Axis spacing');
      expect(box.style.marginLeft).toBe('8px');
      expect(box.style.marginRight).toBe('8px');
      expect(box.style.marginTop).toBe('12px');
      expect(box.style.marginBottom).toBe('12px');
    });
  });

  // Flexbox Layout Tests
  describe('Flexbox Layout', () => {
    test('applies flex properties', () => {
      render(
        <Box 
          display="flex" 
          flex="1" 
          flexDirection="column" 
          flexWrap="wrap"
        >
          Flex container
        </Box>
      );
      const box = screen.getByText('Flex container');
      expect(box.style.display).toBe('flex');
      // Браузер автоматически расширяет flex: 1 до flex: 1 1 0%
      expect(box.style.flex).toBe('1 1 0%');
      expect(box.style.flexDirection).toBe('column');
      expect(box.style.flexWrap).toBe('wrap');
    });

    test('applies flex grow and shrink', () => {
      render(<Box flexGrow={1} flexShrink={0}>Flex item</Box>);
      const box = screen.getByText('Flex item');
      expect(box.style.flexGrow).toBe('1');
      expect(box.style.flexShrink).toBe('0');
    });

    test('applies flexbox alignment', () => {
      render(
        <Box 
          alignItems="center" 
          justifyContent="space-between"
          alignContent="stretch"
        >
          Aligned flex
        </Box>
      );
      const box = screen.getByText('Aligned flex');
      expect(box.style.alignItems).toBe('center');
      expect(box.style.justifyContent).toBe('space-between');
      expect(box.style.alignContent).toBe('stretch');
    });
  });

  // CSS Grid Tests
  describe('CSS Grid', () => {
    test('applies grid display', () => {
      render(<Box display="grid">Grid container</Box>);
      const box = screen.getByText('Grid container');
      expect(box.style.display).toBe('grid');
    });

    test('applies grid template', () => {
      render(
        <Box 
          gridTemplateColumns="1fr 1fr" 
          gridTemplateRows="100px auto"
        >
          Grid template
        </Box>
      );
      const box = screen.getByText('Grid template');
      expect(box.style.gridTemplateColumns).toBe('1fr 1fr');
      expect(box.style.gridTemplateRows).toBe('100px auto');
    });

    test('applies gap', () => {
      render(<Box gap="16px">With gap</Box>);
      const box = screen.getByText('With gap');
      expect(box.style.gap).toBe('16px');
    });

    test('applies grid placement', () => {
      render(
        <Box 
          gridColumn="1 / 3" 
          gridRow="2 / 4" 
          gridArea="header"
        >
          Grid item
        </Box>
      );
      const box = screen.getByText('Grid item');
      expect(box.style.gridColumn).toBe('1 / 3');
      expect(box.style.gridRow).toBe('2 / 4');
      expect(box.style.gridArea).toBe('header');
    });
  });

  // Positioning Tests
  describe('Positioning', () => {
    test('applies position absolute', () => {
      render(
        <Box position="absolute" top={10} right={20}>
          Absolute positioned
        </Box>
      );
      const box = screen.getByText('Absolute positioned');
      expect(box.style.position).toBe('absolute');
      expect(box.style.top).toBe('10px');
      expect(box.style.right).toBe('20px');
    });

    test('applies position fixed', () => {
      render(
        <Box position="fixed" bottom={0} left={0}>
          Fixed positioned
        </Box>
      );
      const box = screen.getByText('Fixed positioned');
      expect(box.style.position).toBe('fixed');
      expect(box.style.bottom).toBe('0px');
      expect(box.style.left).toBe('0px');
    });

    test('applies position sticky', () => {
      render(<Box position="sticky" top={0}>Sticky element</Box>);
      const box = screen.getByText('Sticky element');
      expect(box.style.position).toBe('sticky');
      expect(box.style.top).toBe('0px');
    });
  });

  // Text and Styling Tests
  describe('Text and Styling', () => {
    test('applies text alignment', () => {
      render(<Box textAlign="center">Centered text</Box>);
      const box = screen.getByText('Centered text');
      expect(box.style.textAlign).toBe('center');
    });

    test('applies colors and background', () => {
      render(
        <Box backgroundColor="#f0f0f0" color="#333">
          Styled box
        </Box>
      );
      const box = screen.getByText('Styled box');
      expect(box.style.backgroundColor).toBe('rgb(240, 240, 240)');
      expect(box.style.color).toBe('rgb(51, 51, 51)');
    });

    test('applies border and radius', () => {
      render(
        <Box border="1px solid #ccc" borderRadius="8px">
          Bordered box
        </Box>
      );
      const box = screen.getByText('Bordered box');
      expect(box.style.border).toContain('1px solid');
      expect(box.style.borderRadius).toBe('8px');
    });

    test('applies shadow and opacity', () => {
      render(
        <Box boxShadow="0 2px 4px rgba(0,0,0,0.1)" opacity={0.8}>
          Shadowed box
        </Box>
      );
      const box = screen.getByText('Shadowed box');
      expect(box.style.boxShadow).toBe('0 2px 4px rgba(0,0,0,0.1)');
      expect(box.style.opacity).toBe('0.8');
    });

    test('applies cursor style', () => {
      render(<Box cursor="pointer">Clickable</Box>);
      const box = screen.getByText('Clickable');
      expect(box.style.cursor).toBe('pointer');
    });

    test('applies z-index', () => {
      render(<Box zIndex={1000}>Layered box</Box>);
      const box = screen.getByText('Layered box');
      expect(box.style.zIndex).toBe('1000');
    });
  });

  // Interaction Tests
  describe('Interactions', () => {
    test('handles click events', () => {
      const handleClick = jest.fn();
      render(<Box onClick={handleClick}>Click me</Box>);
      
      const box = screen.getByText('Click me');
      fireEvent.click(box);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('handles mouse events', () => {
      const handleMouseEnter = jest.fn();
      const handleMouseLeave = jest.fn();
      
      render(
        <Box 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Hover me
        </Box>
      );
      
      const box = screen.getByText('Hover me');
      fireEvent.mouseEnter(box);
      fireEvent.mouseLeave(box);
      
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });
  });

  // HTML Attributes Tests
  describe('HTML Attributes', () => {
    test('applies className', () => {
      render(<Box className="custom-class">Styled</Box>);
      const box = screen.getByText('Styled');
      expect(box.className).toContain('custom-class');
    });

    test('applies id', () => {
      render(<Box id="test-id">With ID</Box>);
      const box = screen.getByText('With ID');
      expect(box.id).toBe('test-id');
    });

    test('applies title', () => {
      render(<Box title="Tooltip text">With title</Box>);
      const box = screen.getByTitle('Tooltip text');
      expect(box).toBeTruthy();
    });

    test('applies role', () => {
      render(<Box role="banner">With role</Box>);
      const box = screen.getByText('With role');
      expect(box.getAttribute('role')).toBe('banner');
    });

    test('applies tabIndex', () => {
      render(<Box tabIndex={0}>Focusable</Box>);
      const box = screen.getByText('Focusable');
      expect(box.getAttribute('tabindex')).toBe('0');
    });
  });

  // Complex Layout Tests
  describe('Complex Layout Scenarios', () => {
    test('creates card layout', () => {
      render(
        <Box
          p={24}
          m={16}
          style={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Box as="h3" mb={16} style={{ fontSize: '20px', fontWeight: 600 }}>
            Card Title
          </Box>
          <Box style={{ color: '#666' }}>
            Card content with description
          </Box>
        </Box>
      );

      expect(screen.getByText('Card Title')).toBeTruthy();
      expect(screen.getByText('Card content with description')).toBeTruthy();
    });

    test('creates navbar layout', () => {
      render(
        <Box
          as="nav"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={16}
          style={{
            backgroundColor: '#1a1a1a',
            color: 'white'
          }}
        >
          <Box as="h1" style={{ fontSize: '20px', fontWeight: 'bold' }}>
            MyApp
          </Box>
          <Box display="flex" gap={24}>
            <Box as="a" href="#" style={{ color: 'white', textDecoration: 'none' }}>
              Home
            </Box>
            <Box as="a" href="#" style={{ color: 'white', textDecoration: 'none' }}>
              About
            </Box>
          </Box>
        </Box>
      );

      expect(screen.getByText('MyApp')).toBeTruthy();
      expect(screen.getByText('Home')).toBeTruthy();
      expect(screen.getByText('About')).toBeTruthy();
    });

    test('creates responsive grid', () => {
      render(
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          gap={24}
          p={16}
        >
          <Box p={16} style={{ backgroundColor: '#f5f5f5' }}>Item 1</Box>
          <Box p={16} style={{ backgroundColor: '#f5f5f5' }}>Item 2</Box>
          <Box p={16} style={{ backgroundColor: '#f5f5f5' }}>Item 3</Box>
        </Box>
      );

      expect(screen.getByText('Item 1')).toBeTruthy();
      expect(screen.getByText('Item 2')).toBeTruthy();
      expect(screen.getByText('Item 3')).toBeTruthy();
    });
  });

  // Edge Cases Tests
  describe('Edge Cases', () => {
    test('handles empty children', () => {
      render(<Box />);
      // Should render without errors
      expect(document.querySelector('div')).toBeTruthy();
    });

    test('handles null and undefined values gracefully', () => {
      render(
        <Box
          w={undefined}
          h={null as any}
          m={0}
        >
          Edge case
        </Box>
      );
      
      const box = screen.getByText('Edge case');
      expect(box).toBeTruthy();
    });

    test('merges custom style with spacing props', () => {
      render(
        <Box
          p={16}
          style={{
            backgroundColor: 'blue',
            color: 'white'
          }}
        >
          Merged styles
        </Box>
      );
      
      const box = screen.getByText('Merged styles');
      expect(box.style.padding).toBe('16px');
      expect(box.style.backgroundColor).toBe('blue');
      expect(box.style.color).toBe('white');
    });

    test('handles numeric values for spacing', () => {
      render(<Box m={16} p={8}>Numeric spacing</Box>);
      const box = screen.getByText('Numeric spacing');
      expect(box.style.margin).toBe('16px');
      expect(box.style.padding).toBe('8px');
    });

    test('handles string values for spacing', () => {
      render(<Box m="1rem" p="2em">String spacing</Box>);
      const box = screen.getByText('String spacing');
      expect(box.style.margin).toBe('1rem');
      expect(box.style.padding).toBe('2em');
    });
  });
});